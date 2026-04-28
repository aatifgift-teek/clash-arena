import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gamepad2 } from "lucide-react";
import { useState } from "react";

interface RegistrationModalProps {
  open: boolean;
  onRegister: (username: string) => void;
}

export function RegistrationModal({
  open,
  onRegister,
}: RegistrationModalProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (trimmed.length > 20) {
      setError("Username must be at most 20 characters.");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      setError("Only letters, numbers, and underscores allowed.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegister(trimmed);
    }, 800);
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        data-ocid="registration.dialog"
        className="bg-card border border-primary/30 max-w-sm"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-sm bg-primary/20 border border-primary/40 flex items-center justify-center glow-primary">
              <Gamepad2 size={28} className="text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center font-display font-black text-xl uppercase tracking-tight text-foreground">
            Create Your Profile
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm">
            Choose a unique in-game username to enter the arena.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="username"
              className="font-display font-semibold uppercase text-xs tracking-wider text-muted-foreground"
            >
              Username
            </Label>
            <Input
              id="username"
              data-ocid="registration.input"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="e.g. Sniper_King99"
              className="bg-secondary border-border focus:border-primary text-foreground font-display"
              autoFocus
              autoComplete="off"
            />
            {error && (
              <p
                data-ocid="registration.field_error"
                className="text-destructive text-xs font-body"
              >
                {error}
              </p>
            )}
          </div>

          <Button
            data-ocid="registration.submit_button"
            type="submit"
            disabled={loading || username.trim().length < 3}
            className="w-full btn-glow font-display font-black text-sm uppercase tracking-widest"
          >
            {loading ? (
              <span
                data-ocid="registration.loading_state"
                className="flex items-center gap-2"
              >
                <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                Entering Arena...
              </span>
            ) : (
              "Enter the Arena →"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
