"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
import { ChatHeaderSkeleton } from "./chat-header";
import { ChatListSkeleton } from "./chat-list";
import { ChatFormSkeleton } from "./chat-form";

interface ChatCommunityProps {
    isHidden: boolean;
    hostName: string;
    viewerName: string;
}

export const ChatCommunity = ({
    isHidden,
    hostName,
    viewerName
}: ChatCommunityProps) => {
    const [value, setValue] = useState("");

    const [debouncedValue, setDebouncedValue] = useDebounceValue<string>(value, 500);
    const participants = useParticipants();

    const onChange = (newValue: string) => {
        // OK?
        setDebouncedValue(newValue);
        setValue(newValue);
    }

    const filteredParticipants = useMemo(() => {
        const debuped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host=${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return debuped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase());
        });
    }, [participants, debouncedValue]);

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Input
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search community"
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                    No results
                </p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name}
                        participantIdentity={participant.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    );
}

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    );
}