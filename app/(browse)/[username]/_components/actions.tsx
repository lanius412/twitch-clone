"use client";

import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { onBlock, onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    // isBlocking: boolean;
    userId: string;
};

export const Actions = ({
    isFollowing,
    // isBlocking,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        };
    };

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`Blocked the user ${data.blocked.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`You have unblocked ${data.blocked.username}`))
                .catch(() => toast.error("Something went wrong"));
        });
    }

    const onClick2 = () => {
        handleBlock();
        // handleUnblock();
        // if (isBlocking) {
        //     handleUnblock();
        // } else {
        //     handleBlock();
        // };
    }

    return (
        <>
            <Button
                disabled={isPending}
                onClick={onClick}
                variant="primary"
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button
                disabled={isPending}
                onClick={onClick2}
                variant="destructive"
            >
                Block
                {/* {isBlocking ? "Unblock" : "Block"} */}
            </Button>
        </>
        
    );
}