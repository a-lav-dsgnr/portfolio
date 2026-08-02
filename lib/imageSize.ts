import { readFileSync } from "node:fs";
import path from "node:path";

export type ImageSize = { width: number; height: number };

/* Cached per src for the lifetime of the build so we read each file once. */
const cache = new Map<string, ImageSize | null>();

function parse(buffer: Buffer): ImageSize | null {
  // PNG: signature + IHDR carries dimensions at a fixed offset.
  if (buffer.length >= 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  // JPEG: walk the marker segments until a Start-Of-Frame (SOFn) marker.
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 1 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset++;
        continue;
      }
      let marker = buffer[offset + 1];
      // Skip any fill bytes (0xFF padding) before the real marker.
      while (marker === 0xff && offset + 1 < buffer.length) {
        offset++;
        marker = buffer[offset + 1];
      }
      // Standalone markers (SOI, EOI, RSTn, TEM) carry no length payload.
      if (
        marker === 0xd8 ||
        marker === 0xd9 ||
        (marker >= 0xd0 && marker <= 0xd7) ||
        marker === 0x01
      ) {
        offset += 2;
        continue;
      }
      // SOF0..SOF15 hold the frame dimensions — excluding DHT/JPG/DAC.
      const isSof =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc;
      if (isSof) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  }

  return null;
}

/**
 * Reads the intrinsic pixel dimensions of an image in /public, so next/image
 * can reserve its aspect-ratio box before the file loads (no layout shift).
 * Runs on the server at build time. Returns null if the file can't be read.
 */
export function imageSize(src: string): ImageSize | null {
  const clean = src.split("?")[0].replace(/^\//, "");
  if (cache.has(clean)) return cache.get(clean)!;

  let result: ImageSize | null = null;
  try {
    result = parse(readFileSync(path.join(process.cwd(), "public", clean)));
  } catch {
    result = null;
  }
  cache.set(clean, result);
  return result;
}
