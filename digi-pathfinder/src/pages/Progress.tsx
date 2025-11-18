import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getTrackById } from "@/lib/quizLogic";
import { Calendar, TrendingUp, Target, ArrowRight } from "lucide-react";

interface DayProgress {
  day: number;
  task: string;
  completed: boolean;
}

const generateRoadmap = (trackName: string): DayProgress[] => {
  const roadmaps: Record<string, string[]> = {
    "Social Media Specialist": [
      "Pahami dasar social media marketing & platform utama",
      "Pelajari content planning & kalender konten",
      "Riset audience & competitor analysis",
      "Buat strategi content pillar",
      "Pelajari copywriting untuk social media",
      "Praktik membuat content calendar 1 minggu",
      "Pelajari visual content creation basics",
      "Tools: Canva & template design",
      "Hashtag research & optimization",
      "Community management fundamentals",
      "Engagement strategy & best practices",
      "Instagram algorithm & tips",
      "TikTok content strategy",
      "Facebook marketing basics",
      "Social media analytics introduction",
      "Praktik: Buat mock campaign",
      "Social ads basics (boost post)",
      "Influencer marketing overview",
      "Crisis management di social media",
      "Social listening tools",
      "Content repurposing strategy",
      "Video content creation tips",
      "Stories & Reels best practices",
      "Social media reporting",
      "Tools: Hootsuite/Buffer basics",
      "Personal branding strategy",
      "Portfolio: Buat case study",
      "Interview preparation",
      "Resume & CV optimization",
      "Review & plan next steps"
    ],
    "Digital Ads Specialist": [
      "Pahami dasar digital advertising",
      "Platform overview: Google, Facebook, TikTok",
      "Campaign objectives & funnel stages",
      "Audience targeting fundamentals",
      "Budget & bidding strategy",
      "Google Ads: Search campaigns",
      "Google Ads: Display campaigns",
      "Google Ads: Video campaigns",
      "Facebook Ads Manager overview",
      "Facebook audience insights",
      "Instagram Ads best practices",
      "Ad copywriting & creatives",
      "A/B testing fundamentals",
      "Conversion tracking setup",
      "Landing page optimization",
      "Remarketing strategy",
      "TikTok Ads basics",
      "LinkedIn Ads overview",
      "Ad performance metrics (CTR, CPC, ROAS)",
      "Campaign optimization techniques",
      "Reporting & analytics",
      "Tools: Google Analytics basics",
      "Praktik: Campaign simulation",
      "Budget allocation strategy",
      "Scaling campaign tips",
      "Common mistakes to avoid",
      "Portfolio: Campaign case study",
      "Interview preparation",
      "Resume & certification prep",
      "Review & next learning path"
    ],
    "SEO Specialist": [
      "SEO fundamentals & how search works",
      "On-page SEO basics",
      "Keyword research introduction",
      "Tools: Google Keyword Planner",
      "Content optimization techniques",
      "Title tags & meta descriptions",
      "Header tags & content structure",
      "Internal linking strategy",
      "Image SEO & alt text",
      "Mobile optimization",
      "Page speed optimization",
      "Technical SEO basics",
      "XML sitemaps & robots.txt",
      "Google Search Console setup",
      "Off-page SEO & backlinks",
      "Link building strategies",
      "Local SEO fundamentals",
      "Google My Business",
      "SEO analytics & reporting",
      "Competitor analysis",
      "Content gap analysis",
      "Tools: Ahrefs/SEMrush basics",
      "SEO audit checklist",
      "Algorithm updates awareness",
      "E-A-T & content quality",
      "Praktik: Website audit",
      "Portfolio: SEO case study",
      "Interview preparation",
      "Resume & certification",
      "Review & continuous learning plan"
    ],
    "Content Creator / Copywriter": [
      "Content marketing fundamentals",
      "Content types & formats",
      "Audience research & personas",
      "Content ideation techniques",
      "Storytelling basics",
      "Copywriting principles",
      "Writing compelling headlines",
      "Call-to-action (CTA) best practices",
      "Blog writing structure",
      "SEO content writing",
      "Social media copywriting",
      "Email marketing copy",
      "Ad copy fundamentals",
      "Long-form vs short-form content",
      "Content calendar planning",
      "Visual content creation basics",
      "Tools: Canva & design basics",
      "Video script writing",
      "Content editing & proofreading",
      "Content repurposing strategy",
      "Brand voice & tone",
      "Persuasive writing techniques",
      "Content analytics basics",
      "Portfolio building tips",
      "Praktik: Create content samples",
      "Client brief understanding",
      "Feedback & revision process",
      "Interview preparation",
      "Resume & portfolio showcase",
      "Review & next creative projects"
    ],
    "Data & Performance Analyst": [
      "Marketing analytics fundamentals",
      "Metrics & KPIs overview",
      "Google Analytics 4 basics",
      "Setup & configuration",
      "Events & conversions tracking",
      "Audience & behavior reports",
      "Acquisition channels analysis",
      "Campaign performance tracking",
      "Data visualization basics",
      "Tools: Google Data Studio",
      "Excel/Sheets for marketing",
      "Pivot tables & formulas",
      "Dashboard creation",
      "A/B testing & experiments",
      "Attribution modeling basics",
      "Customer journey analysis",
      "Cohort analysis",
      "Funnel analysis & optimization",
      "Social media analytics",
      "Email marketing metrics",
      "Ads performance analysis",
      "SEO metrics & reporting",
      "Data storytelling",
      "Insight generation",
      "Reporting best practices",
      "Praktik: Build analytics dashboard",
      "Portfolio: Analysis case study",
      "Interview preparation",
      "Resume & skill showcase",
      "Review & advanced learning path"
    ],
    "Digital Strategist": [
      "Digital marketing strategy fundamentals",
      "Business objectives & marketing goals",
      "Market research & analysis",
      "Competitor intelligence",
      "Customer journey mapping",
      "Channel strategy & mix",
      "Budget allocation framework",
      "Campaign planning process",
      "Integrated marketing campaigns",
      "Content strategy development",
      "Social media strategy",
      "Paid advertising strategy",
      "SEO & content distribution",
      "Email marketing strategy",
      "Marketing automation basics",
      "Funnel optimization strategy",
      "Brand positioning",
      "Messaging & value proposition",
      "Target audience segmentation",
      "Campaign brief creation",
      "Team collaboration & management",
      "Stakeholder communication",
      "Performance measurement framework",
      "KPI dashboard & reporting",
      "ROI analysis & optimization",
      "Strategic thinking & problem-solving",
      "Praktik: Develop campaign strategy",
      "Portfolio: Strategy case study",
      "Interview preparation",
      "Review & strategic planning next steps"
    ]
  };

  const tasks = roadmaps[trackName] || roadmaps["Social Media Specialist"];
  
  return tasks.map((task, index) => ({
    day: index + 1,
    task,
    completed: false
  }));
};

const Progress = () => {
  const [selectedTrack, setSelectedTrack] = useState("");
  const [roadmap, setRoadmap] = useState<DayProgress[]>([]);

  useEffect(() => {
    // Get selected track from localStorage
    const storedTrack = localStorage.getItem('digimap_selected_track');
    if (storedTrack) {
      setSelectedTrack(storedTrack);
    }

    // Get or initialize progress
    const storedProgress = localStorage.getItem('digimap_progress');
    if (storedProgress) {
      setRoadmap(JSON.parse(storedProgress));
    } else {
      // Initialize with track-specific roadmap
      const trackData = getTrackById(storedTrack || "social_media");
      const initialRoadmap = generateRoadmap(trackData?.name || "Social Media Specialist");
      setRoadmap(initialRoadmap);
      localStorage.setItem('digimap_progress', JSON.stringify(initialRoadmap));
    }
  }, []);

  const handleToggleDay = (day: number) => {
    const updatedRoadmap = roadmap.map(item => 
      item.day === day ? { ...item, completed: !item.completed } : item
    );
    setRoadmap(updatedRoadmap);
    localStorage.setItem('digimap_progress', JSON.stringify(updatedRoadmap));
  };

  const completedDays = roadmap.filter(item => item.completed).length;
  const progressPercentage = Math.round((completedDays / 30) * 100);
  const trackData = getTrackById(selectedTrack);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Roadmap Belajar 30 Hari
            </h1>
            {trackData && (
              <p className="text-muted-foreground text-lg">
                Jalur kamu: <span className="font-semibold text-primary">{trackData.name}</span>
              </p>
            )}
          </div>

          {/* Progress Summary */}
          <Card className="mb-8 rounded-2xl shadow-card">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-3">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-primary">{completedDays}</p>
                  <p className="text-sm text-muted-foreground">Hari selesai</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-3">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-primary">{progressPercentage}%</p>
                  <p className="text-sm text-muted-foreground">Progress</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-3">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-primary">{30 - completedDays}</p>
                  <p className="text-sm text-muted-foreground">Hari tersisa</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress Keseluruhan</span>
                  <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Roadmap List */}
          <Card className="rounded-2xl shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Checklist 30 Hari</CardTitle>
              <p className="text-muted-foreground">
                Centang setiap hari setelah menyelesaikan tugas harian
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              {roadmap.map((item) => (
                <div
                  key={item.day}
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                    item.completed 
                      ? 'bg-accent/50 border-2 border-primary' 
                      : 'bg-muted/30 border border-border hover:bg-muted/50'
                  }`}
                >
                  <Checkbox
                    id={`day-${item.day}`}
                    checked={item.completed}
                    onCheckedChange={() => handleToggleDay(item.day)}
                    className="mt-1"
                  />
                  <label
                    htmlFor={`day-${item.day}`}
                    className={`flex-1 cursor-pointer ${
                      item.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    <span className="font-semibold text-primary">Day {item.day}</span>
                    <span className="mx-2">—</span>
                    <span>{item.task}</span>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-12 text-center space-y-4">
            {completedDays === 30 ? (
              <Card className="rounded-2xl shadow-card border-2 border-primary">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary">
                      <Target className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Selamat! 🎉</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Kamu telah menyelesaikan roadmap 30 hari! Saatnya untuk praktek lebih dalam dan mulai mencari pengalaman nyata.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <p className="text-muted-foreground">
                Tetap konsisten dan selesaikan satu tugas setiap hari untuk hasil maksimal!
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="rounded-xl"
              >
                <Link to="/result">Lihat Hasil Quiz</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="rounded-xl shadow-button hover:scale-105 transition-transform"
              >
                <Link to="/quiz">
                  Ulangi Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Progress;
