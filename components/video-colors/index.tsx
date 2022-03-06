import { Colord } from 'colord';

export default function VideoColors({
    colors,
    mainColor
}: {
    colors: string;
    mainColor: Colord;
}) {
    const styleBorders = `border-2 border-opacity-50 border-white`;
    const styleColorDots = `rounded-full h-8 w-8 ${styleBorders} m-2 flex`;
    return (
        <>
            <div className="flex flex-wrap justify-start flex-row-reverse">
                {colors &&
                    colors
                        .split(',')
                        .map((color) => (
                            <p
                                key={color}
                                className={styleColorDots}
                                style={{ backgroundColor: color }}
                            ></p>
                        ))}
            </div>
            <div className="flex flex-wrap justify-start flex-row-reverse">
                {colors &&
                    mainColor
                        .harmonies('analogous')
                        .map((color) => (
                            <p
                                key={color.toHex()}
                                className={styleColorDots}
                                style={{ backgroundColor: color.toHex() }}
                            ></p>
                        ))}
            </div>
            <div className="flex flex-wrap justify-start flex-row-reverse">
                {colors &&
                    mainColor
                        .harmonies('complementary')
                        .map((color) => (
                            <p
                                key={color.toHex()}
                                className={styleColorDots}
                                style={{ backgroundColor: color.toHex() }}
                            ></p>
                        ))}
            </div>
            <div className="flex flex-wrap justify-start flex-row-reverse">
                {colors &&
                    mainColor
                        .harmonies('double-split-complementary')
                        .map((color) => (
                            <p
                                key={color.toHex()}
                                className={styleColorDots}
                                style={{ backgroundColor: color.toHex() }}
                            ></p>
                        ))}
            </div>
            <div className="flex flex-wrap justify-start flex-row-reverse">
                {colors &&
                    mainColor
                        .harmonies('rectangle')
                        .map((color) => (
                            <p
                                key={color.toHex()}
                                className={styleColorDots}
                                style={{ backgroundColor: color.toHex() }}
                            ></p>
                        ))}
            </div>
            <div className="flex flex-wrap justify-start flex-row-reverse">
                {colors &&
                    mainColor
                        .harmonies('split-complementary')
                        .map((color) => (
                            <p
                                key={color.toHex()}
                                className={styleColorDots}
                                style={{ backgroundColor: color.toHex() }}
                            ></p>
                        ))}
            </div>
            <div className="flex flex-wrap justify-start flex-row-reverse">
                {colors &&
                    mainColor
                        .harmonies('tetradic')
                        .map((color) => (
                            <p
                                key={color.toHex()}
                                className={styleColorDots}
                                style={{ backgroundColor: color.toHex() }}
                            ></p>
                        ))}
            </div>
            <div className="flex flex-wrap justify-start flex-row-reverse">
                {colors &&
                    mainColor
                        .harmonies('triadic')
                        .map((color) => (
                            <p
                                key={color.toHex()}
                                className={styleColorDots}
                                style={{ backgroundColor: color.toHex() }}
                            ></p>
                        ))}
            </div>
        </>
    );
}
