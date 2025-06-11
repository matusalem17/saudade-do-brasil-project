
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, Tags, Calendar, FileText, Home } from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar = ({ currentPage, onPageChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'employees', label: 'Funcionários', icon: Users },
    { id: 'categories', label: 'Categorias', icon: Tags },
    { id: 'payroll', label: 'Folha de Pagamento', icon: Calendar },
    { id: 'reports', label: 'Relatórios', icon: FileText },
  ];

  return (
    <Card className="w-64 h-screen rounded-none border-r">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Sistema RH</h2>
          <p className="text-sm text-muted-foreground">Controle Financeiro</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onPageChange(item.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </Card>
  );
};
