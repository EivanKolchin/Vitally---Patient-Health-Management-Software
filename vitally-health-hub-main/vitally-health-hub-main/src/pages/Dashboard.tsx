import { DashboardLayout } from "@/components/DashboardLayout";
import { HealthMetricCard } from "@/components/HealthMetricCard";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Droplet, Moon, Plus, FileText, MessageSquare } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Welcome back, Sarah</h2>
            <p className="text-muted-foreground mt-1">Here's an overview of your health today</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Quick Actions
          </Button>
        </div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <HealthMetricCard
            title="Heart Rate"
            value="72"
            unit="bpm"
            icon={Heart}
            status="good"
            subtitle="Resting rate"
          />
          <HealthMetricCard
            title="Blood Pressure"
            value="120/80"
            unit="mmHg"
            icon={Activity}
            status="excellent"
            subtitle="Within normal range"
          />
          <HealthMetricCard
            title="Blood Glucose"
            value="95"
            unit="mg/dL"
            icon={Droplet}
            status="good"
            subtitle="Fasting level"
          />
          <HealthMetricCard
            title="Sleep Quality"
            value="7.5"
            unit="hours"
            icon={Moon}
            status="good"
            subtitle="Last night"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Upcoming Appointments</span>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AppointmentCard
                  doctor="Dr. Emily Chen"
                  specialty="Primary Care Physician"
                  date="Tomorrow, Nov 17"
                  time="10:00 AM"
                  location="Main Clinic, Room 204"
                  type="in-person"
                />
                <AppointmentCard
                  doctor="Dr. Michael Roberts"
                  specialty="Cardiologist"
                  date="Nov 22, 2025"
                  time="2:30 PM"
                  type="virtual"
                />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  View Lab Results
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message Provider
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Plus className="w-4 h-4" />
                  Log Symptoms
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Today's Reminders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Take morning medication</p>
                    <p className="text-xs text-muted-foreground">9:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Blood pressure check</p>
                    <p className="text-xs text-muted-foreground">2:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
