
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { FileDown, TrendingUp, DollarSign, Users } from "lucide-react";

const monthlyData = [
  { month: "Jan", total: 125000, employees: 150 },
  { month: "Fev", total: 128000, employees: 152 },
  { month: "Mar", total: 132000, employees: 154 },
  { month: "Abr", total: 135000, employees: 155 },
  { month: "Mai", total: 140000, employees: 156 },
  { month: "Jun", total: 142000, employees: 156 },
];

const categoryData = [
  { name: "Salário Fixo", value: 85000, color: "#8884d8" },
  { name: "Benefícios", value: 25000, color: "#82ca9d" },
  { name: "Hora Extra", value: 15000, color: "#ffc658" },
  { name: "Bônus", value: 12000, color: "#ff7300" },
  { name: "Descontos", value: -8000, color: "#ff0000" },
];

const departmentData = [
  { department: "Administração", employees: 45, totalSalary: 180000 },
  { department: "Vendas", employees: 38, totalSalary: 152000 },
  { department: "Produção", employees: 52, totalSalary: 208000 },
  { department: "TI", employees: 21, totalSalary: 168000 },
];

const chartConfig = {
  total: { label: "Total", color: "hsl(var(--primary))" },
  employees: { label: "Funcionários", color: "hsl(var(--secondary))" },
};

export const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Relatórios e Análises</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Folha Total (Jun)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 142.000</div>
            <p className="text-xs text-muted-foreground">+1.4% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funcionários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Estável</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+13.6%</div>
            <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução da Folha de Pagamento</CardTitle>
            <CardDescription>Progressão mensal dos gastos com pessoal</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <CardDescription>Participação de cada categoria na folha</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Análise por Departamento</CardTitle>
            <CardDescription>Custos e funcionários por setor</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="totalSalary" fill="var(--color-total)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filtros de Relatório</CardTitle>
            <CardDescription>Personalize seus relatórios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="startMonth">Período Inicial</Label>
                <Input id="startMonth" type="month" defaultValue="2024-01" />
              </div>
              <div>
                <Label htmlFor="endMonth">Período Final</Label>
                <Input id="endMonth" type="month" defaultValue="2024-06" />
              </div>
              <div>
                <Label htmlFor="department">Departamento</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="">Todos os departamentos</option>
                  <option value="admin">Administração</option>
                  <option value="sales">Vendas</option>
                  <option value="production">Produção</option>
                  <option value="it">TI</option>
                </select>
              </div>
              <Button className="w-full">Gerar Relatório Personalizado</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
