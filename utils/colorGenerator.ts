export class ColorGenerator {
  private static usedColors: Set<string> = new Set();

  /**
   * Generates a random RGB color from 16777216 possible colors (256^3)
   * Returns a hex color string
   */
  static generateRandomColor(): string {
    let color: string;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      // Generate random RGB values (0-255)
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      
      // Convert to hex
      color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      attempts++;
    } while (this.usedColors.has(color) && attempts < maxAttempts);

    this.usedColors.add(color);
    return color;
  }

  /**
   * Generates a unique color for each index to ensure consistent colors
   */
  static generateColorForIndex(index: number): string {
    // Use a simple hash function to generate consistent colors based on index
    const hash = (index * 2654435761) % 16777216;
    const r = (hash >> 16) & 255;
    const g = (hash >> 8) & 255;
    const b = hash & 255;
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
} 