import React from "react";
import Image from "next/legacy/image";
import { VoiceActor } from "interface";

const VoiceActorComponent = ({ voice_actor }: { voice_actor: VoiceActor }) => {
  return (
    <div
      className="flex flex-col items-center justify-between text-center min-[500px]:w-[200px]
     min-[500px]:flex-row min-[500px]:items-start min-[500px]:gap-2 min-[500px]:text-start"
    >
      <div className="text-xs sm:text-base">
        <p className={`font-semibold text-primary`}>
          {/* "name": "string" */}
          {voice_actor.person.name}
        </p>
        {/* "language": "string" */}
        <p className="text-sm text-gray-500">{voice_actor.language}</p>
      </div>
      <div>
        <Image
          className="rounded-lg"
          // "image_url": "string"
          src={voice_actor.person.images.jpg.image_url}
          width={60}
          height={70}
          // "name": "string"
          alt={voice_actor.person.name}
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default VoiceActorComponent;
