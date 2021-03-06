export interface IColorPickerProps {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  /**
   * The CSS-compatible string to describe the initial color
   */
  color: string;

  /**
   * Callback issued when the user changes the color
   */
  onColorChanged?: (color: string) => void;

  /**
   * The setting of whether to hide the alpha control slider.
   */
  alphaSliderHidden?: boolean;
}
