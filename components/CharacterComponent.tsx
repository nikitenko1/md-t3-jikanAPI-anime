import React from "react";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { v4 } from "uuid";
import { Character } from "interface";
import LineOverlay from "./LineOverlay";
import VoiceActorComponent from "./VoiceActorComponent";

const CharacterComponent = ({ character }: { character: Character }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between gap-x-2 py-2">
        <div className="flex gap-x-2 self-start">
          <Image
            className="rounded-lg"
            // "image_url": "string"
            src={character?.character.images.jpg.image_url}
            width={60}
            height={70}
            // "name": "string"
            alt={character.character.name}
            objectFit="cover"
          />
          <div className="space-y-3 truncate text-xs sm:text-base">
            <p className={`truncate font-semibold text-primary`}>
              {character?.character.name}
            </p>
            {/* "role": "string" */}
            <p className=" text-gray-500">{character?.role}</p>
          </div>
        </div>

        {router.pathname.includes("/anime") ? (
          <div className="space-y-4">
            {/* "voice_actors": [{...}] */}
            {character?.voice_actors.map((voice_actor) => (
              <VoiceActorComponent key={v4()} voice_actor={voice_actor} />
            ))}
          </div>
        ) : null}
      </div>
      <LineOverlay />
    </>
  );
};

export default CharacterComponent;
