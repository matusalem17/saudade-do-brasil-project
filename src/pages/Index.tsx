
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, Calendar, BarChart3, Settings, FileText } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { EmployeesPage } from "@/components/EmployeesPage";
import { CategoriesPage } from "@/components/CategoriesPage";
import { PayrollPage } from "@/components/PayrollPage";
import { ReportsPage } from "@/components/ReportsPage";
import { DashboardPage } from "@/components/DashboardPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'employees':
        return <EmployeesPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'payroll':
        return <PayrollPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Sistema de Controle Financeiro - RH</h1>
            <p className="text-muted-foreground">Gestão completa da folha de pagamento e controle administrativo</p>
          </header>
          {renderCurrentPage()}
        </div>
      </main>
    </div>
  );
};

export default Index;
