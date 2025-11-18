import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Briefcase,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Platform Career Guidance untuk Digital Marketer</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Temukan Jalur Karier{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Digital Marketing
                </span>{" "}
                yang Paling Cocok Buat Kamu
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Isi quiz singkat, dapatkan rekomendasi jalur (Sosmed, Ads, SEO, Content, Analyst, Strategist), 
                lalu ikuti roadmap belajar sampai siap kerja.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="rounded-xl shadow-button text-base px-8 hover:scale-105 transition-transform"
                >
                  <Link to="/quiz">
                    Mulai Quiz Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="rounded-xl text-base px-8"
                >
                  <Link to="/progress">Lihat Roadmap</Link>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground pt-2">
                ✨ Gratis untuk semua pengguna · 5 menit untuk menyelesaikan
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Cara Kerja DIGIMAP
              </h2>
              <p className="text-muted-foreground text-lg">
                Tiga langkah sederhana untuk menemukan jalur karier ideal kamu
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 shadow-card hover:shadow-lg transition-all rounded-2xl">
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">1. Isi Quiz</h3>
                  <p className="text-muted-foreground">
                    Jawab 6 pertanyaan singkat tentang preferensi dan ketertarikan kamu dalam digital marketing
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-card hover:shadow-lg transition-all rounded-2xl">
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">2. Lihat Rekomendasi</h3>
                  <p className="text-muted-foreground">
                    Dapatkan analisis lengkap jalur karier yang paling sesuai dengan profil kamu
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-card hover:shadow-lg transition-all rounded-2xl">
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-tertiary flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">3. Ikuti Roadmap</h3>
                  <p className="text-muted-foreground">
                    Pantau progress belajar kamu dengan roadmap 30 hari yang terstruktur
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* For Who Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                DIGIMAP Untuk Siapa?
              </h2>
              <p className="text-muted-foreground text-lg">
                Platform ini cocok untuk berbagai kalangan yang ingin berkarier di digital marketing
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: GraduationCap, title: "Mahasiswa", desc: "Yang ingin mempersiapkan karier sejak dini" },
                { icon: Users, title: "Fresh Graduate", desc: "Yang baru lulus dan mencari arah karier" },
                { icon: Briefcase, title: "Career Switcher", desc: "Yang ingin pindah ke digital marketing" },
                { icon: Target, title: "Pemula Digital Marketing", desc: "Yang ingin fokus ke jalur spesifik" }
              ].map((item, idx) => (
                <Card key={idx} className="border shadow-card hover:shadow-lg transition-all rounded-2xl group hover:-translate-y-1">
                  <CardContent className="pt-6 pb-6 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-accent flex items-center justify-center group-hover:bg-gradient-primary transition-colors">
                      <item.icon className="h-6 w-6 text-accent-foreground group-hover:text-white" />
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="border-2 shadow-card rounded-2xl overflow-hidden max-w-4xl mx-auto">
              <div className="bg-gradient-primary p-1">
                <CardContent className="bg-card p-8 md:p-12 text-center space-y-6">
                  <CheckCircle className="h-16 w-16 mx-auto text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Mulai Perjalanan Karier Kamu Sekarang
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Dapatkan clarity tentang jalur karier digital marketing yang tepat untuk kamu. 
                    Gratis, cepat, dan akurat.
                  </p>
                  <Button 
                    asChild 
                    size="lg" 
                    className="rounded-xl shadow-button text-base px-8 hover:scale-105 transition-transform"
                  >
                    <Link to="/quiz">
                      Mulai dari Gratis – Isi Quiz Sekarang
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
