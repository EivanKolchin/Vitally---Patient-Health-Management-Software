import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Newspaper, TrendingUp, Heart, Brain, Activity } from "lucide-react";
import { useState } from "react";

const newsArticles = [
  {
    id: 1,
    title: "New Study Reveals Benefits of Mediterranean Diet for Heart Health",
    excerpt: "Research shows significant improvements in cardiovascular health markers among participants following a Mediterranean diet.",
    category: "Nutrition",
    date: "2 hours ago",
    icon: Heart,
    trending: true,
  },
  {
    id: 2,
    title: "Mental Health Awareness: Understanding Anxiety in Modern Times",
    excerpt: "Expert insights on managing anxiety and stress in today's fast-paced world.",
    category: "Mental Health",
    date: "5 hours ago",
    icon: Brain,
  },
  {
    id: 3,
    title: "Exercise Guidelines Updated: What You Need to Know",
    excerpt: "Health organizations release new recommendations for physical activity and fitness.",
    category: "Fitness",
    date: "1 day ago",
    icon: Activity,
  },
  {
    id: 4,
    title: "Breakthrough in Diabetes Management Technology",
    excerpt: "New continuous glucose monitoring systems offer improved accuracy and convenience.",
    category: "Technology",
    date: "2 days ago",
    icon: TrendingUp,
  },
  {
    id: 5,
    title: "Sleep Hygiene: Tips for Better Rest and Recovery",
    excerpt: "Discover evidence-based strategies to improve your sleep quality and overall health.",
    category: "Wellness",
    date: "3 days ago",
    icon: Newspaper,
  },
  {
    id: 6,
    title: "Understanding Vaccination: Latest Updates and Guidelines",
    excerpt: "Comprehensive guide to current vaccination recommendations for adults and children.",
    category: "Preventive Care",
    date: "4 days ago",
    icon: Heart,
    trending: true,
  },
];

export default function HealthNews() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Health News & Advice</h1>
          <p className="text-muted-foreground">Stay informed with the latest health updates and expert guidance</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search health news and advice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {filteredNews.length > 0 ? (
            filteredNews.map((article) => {
              const Icon = article.icon;
              return (
                <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{article.category}</Badge>
                            {article.trending && (
                              <Badge variant="default" className="bg-accent">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                          <CardDescription className="text-base">{article.excerpt}</CardDescription>
                          <p className="text-sm text-muted-foreground mt-3">{article.date}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">No articles found matching your search.</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search terms.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
