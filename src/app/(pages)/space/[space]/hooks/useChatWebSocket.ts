import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MessageDto } from "@/dto/messageDto";
import { UserDto } from "@/dto/userDto";
import { SpaceDto } from "@/dto/spaceDto";
import { useMessageStore } from "@/app/store/useMessageStore";

export type WebSocketStatus = "connecting" | "connected" | "disconnected" | "error";

export function useChatWebSocket(
    user: UserDto | null,
    space: SpaceDto | null,
    isOwner: boolean,
    isMemberOf: boolean
) {
    const wsRef = useRef<WebSocket | null>(null);
    const [wsStatus, setWsStatus] = useState<WebSocketStatus>("disconnected");

    useEffect(() => {
        if (!user || !space?.slug || (!isOwner && !isMemberOf)) return;

        if (wsRef.current) {
            wsRef.current.close();
        }

        try {
            const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL?.replace(/^http/, "ws") ||
                process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/^http/, "ws")
                }/ws/connect?username=${encodeURIComponent(
                    user.username || ""
                )}&name=${encodeURIComponent(
                    user.name || ""
                )}&avatar_type=${encodeURIComponent(
                    user.avatar_type || ""
                )}&channel=${encodeURIComponent(space.slug)}`;

            setWsStatus("connecting");

            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                setWsStatus("connected");
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log("WebSocket message received:", data);

                    if (data.type === "chat") {
                        const newMessage: MessageDto = data.message as MessageDto;

                        useMessageStore.setState((state) => ({
                            messages: [newMessage, ...state.messages]
                        }));
                    }
                } catch (error) {
                    console.error("Error parsing WebSocket message:", error);
                }
            };

            ws.onerror = () => {
                console.error("WebSocket connection error");
                setWsStatus("error");
            };

            ws.onclose = (event) => {
                console.log("WebSocket closed:", event.code, event.reason);
                setWsStatus("disconnected");
            };
        } catch (error) {
            console.error("WebSocket connection failed:", error);
            toast.error("Failed to establish chat connection");
            setWsStatus("error");
        }

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
        };
    }, [user, space, isOwner, isMemberOf]);

    return { wsStatus };
}
