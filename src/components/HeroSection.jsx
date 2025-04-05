import MagnetBox from "./MagnetBox";
import { HyperText } from "./HyperText";

export const HeroSection = () => {
    return (
        <section className="md:h-[95vh] flex flex-col md:flex-row justify-between items-center" id="me">
            <model-viewer
                className="z-20"
                src="/static/old_computer_v2.glb"
                alt="compaq"
                auto-rotate
                camera-controls
                auto-rotate-delay="0"
                camera-orbit="-90deg 0 0"
                interaction-prompt="none"
                disable-zoom
                style={{ width: '500px', height: '500px' }}
            >
            </model-viewer>
            <MagnetBox
                className="flex flex-col gap-8 md:gap-3 flex-1"
                force={10}
            >
                <div className="flex flex-col">
                    <HyperText text="HI, I'M" className="text-orange-500 font-grotesque-display text-4xl md:text-6xl glow" />
                    <div className="flex flex-row">
                        <HyperText text="SANTIAGO" className="text-orange-500 font-grotesque-display text-4xl md:text-6xl glow" />
                        <h2 className="text-orange-500 font-grotesque-display text-4xl md:text-6xl blink glow">_</h2>
                    </div>
                </div>
                <p className="text-neutral-400 md:text-xl">I'm a <b className="text-neutral-300">Full Stack Developer</b> passionate about building scalable apps and seamless user experiences. I love tackling challenges and continuously learning to create exceptional digital solutions.</p>
            </MagnetBox>

        </section>
    );
}