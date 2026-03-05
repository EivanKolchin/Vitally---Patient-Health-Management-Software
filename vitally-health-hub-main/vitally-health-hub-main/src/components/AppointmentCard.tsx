import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Video } from "lucide-react";

interface AppointmentCardProps {
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location?: string;
  type: "in-person" | "virtual";
}

export function AppointmentCard({
  doctor,
  specialty,
  date,
  time,
  location,
  type,
}: AppointmentCardProps) {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div>
              <h4 className="font-semibold text-foreground">{doctor}</h4>
              <p className="text-sm text-muted-foreground">{specialty}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{time}</span>
              </div>
              {type === "in-person" && location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              )}
              {type === "virtual" && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Video className="w-4 h-4" />
                  <span>Virtual Appointment</span>
                </div>
              )}
            </div>
          </div>
          
          <Button size="sm" variant="outline">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
