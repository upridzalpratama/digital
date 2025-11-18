import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { questions, calculateScores, type QuizAnswers } from "@/lib/quizLogic";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Quiz = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [hasEnteredEmail, setHasEnteredEmail] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const handleEmailSubmit = async () => {
    // Validate email
    if (!email || !email.includes('@')) {
      toast.error("Mohon masukkan email yang valid");
      return;
    }

    setIsSubmittingEmail(true);

    try {
      // Save email to database
      const { error } = await supabase
        .from('quiz_emails')
        .insert({ email });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          // Email already exists, that's okay
          toast.success("Email berhasil diverifikasi!");
        } else {
          throw error;
        }
      } else {
        toast.success("Email berhasil disimpan!");
      }

      // Store email in localStorage
      localStorage.setItem('digimap_user_email', email);
      
      // Show quiz
      setHasEnteredEmail(true);
    } catch (error) {
      console.error('Error saving email:', error);
      toast.error("Gagal menyimpan email. Silakan coba lagi.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const allAnswered = questions.every(q => answers[q.id] !== undefined);
    
    if (!allAnswered) {
      toast.error("Mohon jawab semua pertanyaan sebelum melanjutkan");
      return;
    }

    // Calculate scores
    const scores = calculateScores(answers);
    
    // Store results in localStorage
    localStorage.setItem('digimap_quiz_answers', JSON.stringify(answers));
    localStorage.setItem('digimap_quiz_scores', JSON.stringify(scores));
    
    toast.success("Quiz selesai! Melihat hasil...");
    
    // Navigate to results page
    setTimeout(() => {
      navigate('/result');
    }, 500);
  };

  const isQuestionAnswered = (questionId: number) => answers[questionId] !== undefined;
  const allQuestionsAnswered = questions.every(q => isQuestionAnswered(q.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {!hasEnteredEmail ? (
            // Email Gate
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Quiz Jalur Karier Digital Marketing
                </h1>
                <p className="text-muted-foreground text-lg">
                  Masukkan email kamu untuk memulai quiz dan mendapatkan hasil rekomendasi
                </p>
              </div>

              <Card className="rounded-2xl shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Mail className="h-6 w-6 text-primary" />
                    Masukkan Email
                  </CardTitle>
                  <CardDescription>
                    Email akan digunakan untuk mengirimkan hasil rekomendasi kamu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !isSubmittingEmail) {
                        handleEmailSubmit();
                      }
                    }}
                    className="text-base"
                    required
                    disabled={isSubmittingEmail}
                  />
                  <Button 
                    onClick={handleEmailSubmit}
                    disabled={!email || isSubmittingEmail}
                    className="w-full rounded-xl shadow-button"
                    size="lg"
                  >
                    {isSubmittingEmail ? "Memproses..." : "Mulai Quiz"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Quiz Content
            <>
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Quiz Jalur Karier Digital Marketing
                </h1>
                <p className="text-muted-foreground text-lg">
                  Jawab {questions.length} pertanyaan berikut dengan jujur untuk mendapatkan rekomendasi jalur karier yang paling sesuai dengan kamu
                </p>
              </div>

          {/* Progress Indicator */}
          <Card className="mb-8 rounded-2xl shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {Object.keys(answers).length} / {questions.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-6">
            {questions.map((question) => (
              <Card 
                key={question.id} 
                className={`rounded-2xl shadow-card transition-all ${
                  isQuestionAnswered(question.id) 
                    ? 'border-primary border-2' 
                    : 'border'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg">
                      {question.id}. {question.text}
                    </CardTitle>
                    {isQuestionAnswered(question.id) && (
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    )}
                  </div>
                  {question.description && (
                    <p className="text-sm text-muted-foreground">
                      {question.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[question.id]?.toString() || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                    className="space-y-3"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div 
                        key={value}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-accent transition-colors cursor-pointer"
                      >
                        <RadioGroupItem value={value.toString()} id={`q${question.id}-${value}`} />
                        <Label 
                          htmlFor={`q${question.id}-${value}`}
                          className="flex-1 cursor-pointer font-normal"
                        >
                          <div className="flex items-center justify-between">
                            <span>{value}</span>
                            <span className="text-xs text-muted-foreground">
                              {value === 1 && "Sangat tidak setuju"}
                              {value === 2 && "Tidak setuju"}
                              {value === 3 && "Netral"}
                              {value === 4 && "Setuju"}
                              {value === 5 && "Sangat setuju"}
                            </span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className="rounded-xl shadow-button text-base px-8 hover:scale-105 transition-transform"
            >
              Lihat Hasil Rekomendasi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {!allQuestionsAnswered && (
              <p className="text-sm text-muted-foreground mt-4">
                Mohon jawab semua pertanyaan untuk melihat hasil
              </p>
            )}
          </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Quiz;
