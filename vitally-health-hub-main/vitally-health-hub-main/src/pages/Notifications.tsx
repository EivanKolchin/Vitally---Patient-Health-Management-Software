import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Pill, AlertCircle, CheckCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "appointment",
    title: "Upcoming Appointment Reminder",
    message: "You have an appointment with Dr. Sarah Johnson tomorrow at 2:00 PM",
    time: "2 hours ago",
    read: false,
    icon: Calendar,
  },
  {
    id: 2,
    type: "medication",
    title: "Medication Reminder",
    message: "Time to take your evening medication - Lisinopril 10mg",
    time: "4 hours ago",
    read: false,
    icon: Pill,
  },
  {
    id: 3,
    type: "alert",
    title: "Lab Results Available",
    message: "Your recent blood test results are now available for review",
    time: "1 day ago",
    read: true,
    icon: AlertCircle,
  },
  {
    id: 4,
    type: "success",
    title: "Appointment Confirmed",
    message: "Your appointment with Dr. Michael Chen has been confirmed for next week",
    time: "2 days ago",
    read: true,
    icon: CheckCircle,
  },
];

export default function Notifications() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your health reminders and alerts</p>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
                <CardHeader className="flex flex-row items-start space-y-0 gap-4">
                  <div className={`p-2 rounded-lg ${
                    notification.type === "appointment" ? "bg-primary/10" :
                    notification.type === "medication" ? "bg-secondary/10" :
                    notification.type === "alert" ? "bg-accent/10" :
                    "bg-health-good/10"
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      notification.type === "appointment" ? "text-primary" :
                      notification.type === "medication" ? "text-secondary" :
                      notification.type === "alert" ? "text-accent" :
                      "text-health-good"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{notification.title}</CardTitle>
                      {!notification.read && (
                        <Badge variant="default" className="ml-2">New</Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2">{notification.message}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
