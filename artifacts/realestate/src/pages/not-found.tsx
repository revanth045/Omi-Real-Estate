import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 border-secondary/20 shadow-2xl">
        <CardContent className="pt-8 text-center">
          <div className="flex flex-col items-center mb-6 gap-4">
            <AlertCircle className="h-12 w-12 text-secondary" />
            <h1 className="text-3xl font-serif font-bold text-primary">Lost in the Landscape</h1>
          </div>

          <p className="mt-4 text-muted-foreground font-light">
            The property or page you are looking for has been moved or does not exist.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
