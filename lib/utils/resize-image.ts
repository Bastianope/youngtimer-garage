// Réduit une photo (souvent 5 Mo et plus sur téléphone) avant l'envoi.
// Les PDF et les formats non décodables par le navigateur sont renvoyés tels quels.
export async function resizeImage(file: File, maxSide = 2000, quality = 0.85): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    return blob ?? file;
  } catch {
    return file;
  }
}

export function extensionFor(blob: Blob, originalName: string): string {
  if (blob.type === "application/pdf") return "pdf";
  if (blob.type === "image/jpeg") return "jpg";
  if (blob.type === "image/png") return "png";
  if (blob.type === "image/webp") return "webp";
  const fromName = originalName.split(".").pop()?.toLowerCase();
  return fromName && /^[a-z0-9]{2,5}$/.test(fromName) ? fromName : "bin";
}
