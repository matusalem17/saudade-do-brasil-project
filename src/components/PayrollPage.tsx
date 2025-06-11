
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, FileDown, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PayrollEntry {
  id: number;
  employeeId: number;
  employeeName: string;
  categoryId: number;
  categoryName: string;
  categoryType: 'credit' | 'debit';
  amount: number;
  month: string;
}

const mockEntries: PayrollEntry[] = [
  { id: 1, employeeId: 1, employeeName: "João Silva", categoryId: 1, categoryName: "Salário Fixo", categoryType: "credit", amount: 4500, month: "2024-06" },
  { id: 2, employeeId: 1, employeeName: "João Silva", categoryId: 2, categoryName: "Vale Refeição", categoryType: "credit", amount: 500, month: "2024-06" },
  { id: 3, employeeId: 1, employeeName: "João Silva", categoryId: 5, categoryName: "INSS", categoryType: "debit", amount: 450, month: "2024-06" },
];

export const PayrollPage = () => {
  const [entries, setEntries] = useState<PayrollEntry[]>(mockEntries);
  const [showForm, setShowForm] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("2024-06");
  const [formData, setFormData] = useState({
    employeeId: "",
    categoryId: "",
    amount: "",
    month: "2024-06",
  });

  const mockEmployees = [
    { id: 1, name: "João Silva" },
    { id: 2, name: "Maria Santos" },
    { id: 3, name: "Pedro Costa" },
  ];

  const mockCategories = [
    { id: 1, name: "Salário Fixo", type: "credit" },
    { id: 2, name: "Vale Refeição", type: "credit" },
    { id: 5, name: "INSS", type: "debit" },
    { id: 7, name: "Hora Extra", type: "credit" },
  ];

  const filteredEntries = entries.filter(entry => entry.month === selectedMonth);

  const calculateNetSalary = (employeeId: number) => {
    const employeeEntries = filteredEntries.filter(entry => entry.employeeId === employeeId);
    const credits = employeeEntries.filter(entry => entry.categoryType === 'credit').reduce((sum, entry) => sum + entry.amount, 0);
    const debits = employeeEntries.filter(entry => entry.categoryType === 'debit').reduce((sum, entry) => sum + entry.amount, 0);
    return credits - debits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employee = mockEmployees.find(emp => emp.id === parseInt(formData.employeeId));
    const category = mockCategories.find(cat => cat.id === parseInt(formData.categoryId));
    
    if (employee && category) {
      const newEntry: PayrollEntry = {
        id: Math.max(...entries.map(e => e.id)) + 1,
        employeeId: employee.id,
        employeeName: employee.name,
        categoryId: category.id,
        categoryName: category.name,
        categoryType: category.type as 'credit' | 'debit',
        amount: parseFloat(formData.amount),
        month: formData.month,
      };
      setEntries([...entries, newEntry]);
      setFormData({ employeeId: "", categoryId: "", amount: "", month: "2024-06" });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Folha de Pagamento</h2>
        <div className="flex space-x-2">
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Lançamento
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Selecione o mês de referência</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div>
              <Label htmlFor="month">Mês de Referência</Label>
              <Input
                id="month"
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Novo Lançamento</CardTitle>
            <CardDescription>Adicione um lançamento na folha de pagamento</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employee">Funcionário</Label>
                  <select
                    id="employee"
                    value={formData.employeeId}
                    onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="">Selecione um funcionário</option>
                    {mockEmployees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    value={formData.categoryId}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {mockCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name} ({cat.type === 'credit' ? 'Crédito' : 'Débito'})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="amount">Valor</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="month">Mês</Label>
                  <Input
                    id="month"
                    type="month"
                    value={formData.month}
                    onChange={(e) => setFormData(prev => ({ ...prev, month: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit">Adicionar Lançamento</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lançamentos - {selectedMonth}</CardTitle>
          <CardDescription>Todos os lançamentos do mês selecionado</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.employeeName}</TableCell>
                  <TableCell>{entry.categoryName}</TableCell>
                  <TableCell>
                    <Badge variant={entry.categoryType === 'credit' ? 'default' : 'destructive'}>
                      {entry.categoryType === 'credit' ? 'Crédito' : 'Débito'}
                    </Badge>
                  </TableCell>
                  <TableCell>R$ {entry.amount.toLocaleString('pt-BR')}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo Salarial - {selectedMonth}</CardTitle>
          <CardDescription>Salário líquido por funcionário</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Total Créditos</TableHead>
                <TableHead>Total Débitos</TableHead>
                <TableHead>Salário Líquido</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmployees.map((employee) => {
                const employeeEntries = filteredEntries.filter(entry => entry.employeeId === employee.id);
                const credits = employeeEntries.filter(entry => entry.categoryType === 'credit').reduce((sum, entry) => sum + entry.amount, 0);
                const debits = employeeEntries.filter(entry => entry.categoryType === 'debit').reduce((sum, entry) => sum + entry.amount, 0);
                const netSalary = credits - debits;
                
                return (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell className="text-green-600">R$ {credits.toLocaleString('pt-BR')}</TableCell>
                    <TableCell className="text-red-600">R$ {debits.toLocaleString('pt-BR')}</TableCell>
                    <TableCell className="font-bold">R$ {netSalary.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <FileDown className="h-4 w-4 mr-1" />
                        Contracheque
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
