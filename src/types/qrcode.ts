export interface QRCodeSettings {
  text: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  includeMargin: boolean;
  logoFile: File | null;
  logoSize: number;
}