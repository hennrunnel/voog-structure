
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Upsell = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Upsell</h1>
        
        <Card className="w-full">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">English</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
                <Button size="sm">
                  Add language
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Upgrade required</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your Voog Standard plan allows 3 languages. For just €22 per month you'll get 20 GB of storage, unlimited pages, users, languages, and access to developer tools for deep customization of your website.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Contact site admin
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upsell;
