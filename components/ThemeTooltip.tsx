import { useThemeModal } from "lib/zustand";

const ThemeTooltip = () => {
  const { open } = useThemeModal();

  return (
    <div className="tooltip" data-tip="Theme" onClick={() => open()}>
      <div className="h-8 w-8 cursor-pointer rounded-full border bg-primary"></div>
    </div>
  );
};

export default ThemeTooltip;
