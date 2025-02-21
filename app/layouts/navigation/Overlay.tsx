"use client";

type OverlayProps = {
 onClick: () => void;
};

const Overlay = ({ onClick }: OverlayProps) => (
 <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClick}></div>
);

export default Overlay;