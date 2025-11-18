import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Sparkles, Users } from "lucide-react";

const Learning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="mx-auto" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Learning
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Platform pembelajaran dari para expert untuk digital marketer dan business owner
            </p>
          </div>
        </section>

        {/* Features Preview */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-border/40">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Course dari Expert</CardTitle>
                <CardDescription>
                  Pembelajaran langsung dari praktisi berpengalaman di bidang digital marketing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Gratis & Berbayar</CardTitle>
                <CardDescription>
                  Akses course gratis untuk memulai, dan course premium untuk skill yang lebih advanced
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Untuk Semua Level</CardTitle>
                <CardDescription>
                  Cocok untuk digital marketer pemula hingga advanced, serta business owner
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Learning;
