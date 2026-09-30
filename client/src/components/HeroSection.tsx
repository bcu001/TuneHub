import { BlurFade } from "./ui/blur-fade";

function HeroSection() {
  return (
    <div className="">
      <BlurFade direction="up" delay={0.5}>
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <div className="absolute inset-4 z-10 text-white">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight">
              Your Soundtrack Starts Here.
            </h2>

            <p className="mt-1 text-sm md:text-md lg:text-lg xl:text-xl text-muted-foreground font-semibold">
              Explore music across genres, discover new favorites, and build
              playlists made for you.
            </p>
          </div>
          <video
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controls={false}
            className="absolute inset-0 size-full border border-border/30 object-cover object-center shadow-sm"
          >
            {/* Mobile */}
            <source
              media="(max-width: 639px)"
              src="https://res.cloudinary.com/dp7nw5npc/video/upload/c_fill,w_640,h_360,q_auto/awpfvp3pd583msuwikrq.mp4"
              type="video/mp4"
            />

            {/* Tablet */}
            <source
              media="(max-width: 1023px)"
              src="https://res.cloudinary.com/dp7nw5npc/video/upload/c_fill,w_1024,h_576,q_auto/awpfvp3pd583msuwikrq.mp4"
              type="video/mp4"
            />

            {/* Desktop */}
            <source
              src="https://res.cloudinary.com/dp7nw5npc/video/upload/c_fill,w_1920,h_1080,q_auto/awpfvp3pd583msuwikrq.mp4"
              type="video/mp4"
            />
          </video>

          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black/30" />
        </div>
      </BlurFade>
    </div>
  );
}

export default HeroSection;
