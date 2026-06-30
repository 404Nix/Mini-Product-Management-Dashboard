import {Globe, Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer className="mt-16 border-t">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground md:flex-row">
                <p className="flex items-center gap-1">
                    Built with
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    by{" "}
                    <span className="font-medium text-foreground">
                        Nikhil Kanojia
                    </span>
                </p>

                <div className="flex items-center gap-5">
                    <a
                        href="https://github.com/404Nix"
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-foreground"
                    >
                    </a>

                    <a
                        href="https://linkedin.com/in/nikhil-kanojia69"
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-foreground"
                    >
                    </a>

                    <a
                        href="https://nix404.me"
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-foreground"
                    >
                        <Globe className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
