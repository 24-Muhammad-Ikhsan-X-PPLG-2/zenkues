import React, { FC } from 'react';

const ColorSwatch: FC<{ value: string; onChange: (v: string) => void; colors: string[] }> = ({ value, onChange, colors }) => (
    <div className="flex items-center gap-2">
        {colors.map((c) => (
            <button
                key={c}
                onClick={() => onChange(c)}
                aria-label={c}
                className={`h-8 w-8 cursor-pointer rounded-full ring-2 transition-shadow ${
                    value === c ? 'shadow-md ring-indigo-300' : 'ring-transparent hover:shadow-sm'
                }`}
                style={{ background: c }}
            />
        ))}
    </div>
);

export default ColorSwatch;
