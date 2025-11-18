import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getTrackById, type TrackScore } from "@/lib/quizLogic";
import { ArrowRight, Trophy, BarChart3, Sparkles } from "lucide-react";

const Result = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<TrackScore[]>([]);
  const [topTrack, setTopTrack] = useState<string>("");

  useEffect(() => {
    // Get scores from localStorage
    const storedScores = localStorage.getItem('digimap_quiz_scores');
    
    if (!storedScores) {
      // No results found, redirect to quiz
      navigate('/quiz');
      return;
    }

    const parsedScores: TrackScore[] = JSON.parse(storedScores);
    setScores(parsedScores);
    setTopTrack(parsedScores[0]?.trackId || "");
    
    // Store top track for progress page
    localStorage.setItem('digimap_selected_track', parsedScores[0]?.trackId || "");
  }, [navigate]);

  const topTrackData = getTrackById(topTrack);

  if (scores.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Hasil Quiz Kamu</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Rekomendasi Jalur Karier Kamu
            </h1>
            <p className="text-muted-foreground text-lg">
              Berdasarkan jawaban kamu, berikut adalah analisis jalur karier digital marketing yang paling cocok
            </p>
          </div>

          {/* Top Recommendation */}
          {topTrackData && (
            <Card className="mb-12 rounded-2xl shadow-card border-2 border-primary overflow-hidden">
              <div className="bg-gradient-primary p-1">
                <div className="bg-card">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center">
                        <Trophy className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl">
                      Jalur Terbaik untuk Kamu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pb-8">
                    <div className="text-center space-y-3">
                      <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        {topTrackData.name}
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        {topTrackData.jobTitle}
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-6">
                      <p className="text-foreground leading-relaxed">
                        {topTrackData.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Button 
                        asChild 
                        size="lg" 
                        className="rounded-xl shadow-button hover:scale-105 transition-transform"
                      >
                        <Link to="/progress">
                          Lihat Roadmap Belajar & 30-Day Plan
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          )}

          {/* All Scores */}
          <Card className="rounded-2xl shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Semua Skor Jalur Karier</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Berikut adalah skor untuk semua jalur karier berdasarkan profil kamu
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {scores.map((score, index) => {
                const track = getTrackById(score.trackId);
                if (!track) return null;

                return (
                  <div 
                    key={score.trackId}
                    className={`p-4 rounded-xl transition-all ${
                      index === 0 
                        ? 'bg-accent border-2 border-primary' 
                        : 'bg-muted/30 border border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {index === 0 && <Trophy className="h-5 w-5 text-primary" />}
                          {track.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {track.jobTitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {score.percentage}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Score: {score.score.toFixed(1)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          index === 0 ? 'bg-gradient-primary' : 'bg-primary/60'
                        }`}
                        style={{ width: `${score.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="rounded-xl"
            >
              <Link to="/quiz">Ulangi Quiz</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="rounded-xl shadow-button hover:scale-105 transition-transform"
            >
              <Link to="/progress">
                Mulai Belajar Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Result;
