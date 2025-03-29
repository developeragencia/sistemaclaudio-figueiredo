
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Users, FileText } from 'lucide-react';

const Calendar: React.FC = () => {
  // Mock data for upcoming events
  const events = [
    {
      title: "Reunião com Cliente XYZ",
      date: "Hoje, 14:00",
      type: "client",
      icon: <Users className="w-4 h-4 text-blue-600" />
    },
    {
      title: "Prazo DARF",
      date: "Amanhã, 23:59",
      type: "deadline",
      icon: <Clock className="w-4 h-4 text-red-600" />
    },
    {
      title: "Entrega de Relatório Fiscal",
      date: "12/06/2024, 16:00",
      type: "report",
      icon: <FileText className="w-4 h-4 text-green-600" />
    },
    {
      title: "Verificação de Conformidade",
      date: "15/06/2024, 10:00",
      type: "audit",
      icon: <CalendarIcon className="w-4 h-4 text-purple-600" />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-blue-800">Calendário</h1>
        <p className="text-gray-500">Agenda e prazos tributários</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendário Tributário</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-96 flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300">
                <div className="text-center">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">Nenhum calendário configurado</h3>
                  <p className="mt-1 text-sm text-gray-500">Comece adicionando eventos ao calendário.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="bg-gray-100 rounded-full p-1.5 mt-0.5">
                      {event.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
