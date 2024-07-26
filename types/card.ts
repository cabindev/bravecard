export interface Card {
    id: number;
    imageName: string;
    title: string;
    message: string;
  }
  
  export interface CardInput {
    title: string;
    message: string;
  }

  // interfaces/Icon.ts
export interface IconProps {
  icon: string;
  className?: string;
}
