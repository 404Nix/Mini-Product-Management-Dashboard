import { Loader2 } from "lucide-react";

const Loader = ({ size = 32, text = "Loading...", fullScreen = false }) => {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-3 ${
                fullScreen ? "min-h-screen" : "py-10"
            }`}
        >
            <Loader2 className="animate-spin text-primary" size={size} />

            {text && <p className="text-sm text-muted-foreground">{text}</p>}
        </div>
    );
};

export default Loader;
