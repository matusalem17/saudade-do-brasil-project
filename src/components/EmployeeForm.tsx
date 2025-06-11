
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  baseSalary: number;
  admissionDate: string;
}

interface EmployeeFormProps {
  employee?: Employee | null;
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
  onCancel: () => void;
}

export const EmployeeForm = ({ employee, onSubmit, onCancel }: EmployeeFormProps) => {
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    position: employee?.position || "",
    department: employee?.department || "",
    baseSalary: employee?.baseSalary || 0,
    admissionDate: employee?.admissionDate || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{employee ? 'Editar Funcionário' : 'Novo Funcionário'}</CardTitle>
        <CardDescription>Preencha as informações do funcionário</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="position">Cargo</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleChange('position', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="department">Setor</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="baseSalary">Salário Base</Label>
              <Input
                id="baseSalary"
                type="number"
                step="0.01"
                value={formData.baseSalary}
                onChange={(e) => handleChange('baseSalary', parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div>
              <Label htmlFor="admissionDate">Data de Admissão</Label>
              <Input
                id="admissionDate"
                type="date"
                value={formData.admissionDate}
                onChange={(e) => handleChange('admissionDate', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button type="submit">
              {employee ? 'Atualizar' : 'Cadastrar'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
