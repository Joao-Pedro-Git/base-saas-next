"use client";

import type React from "react";

import { useState } from "react";
import { createPreference } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Shield, ShieldCheck } from "lucide-react";

// Produto fixo
const PRODUCT = {
  name: "Produto Premium",
  price: 99.0,
  description: "Acesso completo ao nosso produto premium com todos os recursos",
};

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validação adicional
      const qty = Number.parseInt(quantity);
      if (isNaN(qty) || qty < 1 || qty > 10) {
        throw new Error("Quantidade inválida");
      }

      // Gerar token CSRF (em um ambiente real)
      const csrfToken = Math.random().toString(36).substring(2, 15);

      const id = await createPreference({
        title: PRODUCT.name,
        price: PRODUCT.price,
        quantity: qty,
        csrfToken, // Para proteção CSRF
      });

      setPreferenceId(id);
    } catch (error) {
      console.error("Erro ao criar preferência:", error);
      setError(
        error instanceof Error ? error.message : "Erro ao processar pagamento"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-gray-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardTitle className="text-2xl">Produto Premium</CardTitle>
        <CardDescription>
          Acesso completo ao nosso produto premium
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <h3 className="font-medium text-gray-900">{PRODUCT.name}</h3>
              <p className="text-sm text-gray-500">{PRODUCT.description}</p>
            </div>
            <div className="text-xl font-bold">
              R$ {PRODUCT.price.toFixed(2)}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade</Label>
            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a quantidade" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-lg font-bold">
                R$ {(PRODUCT.price * Number.parseInt(quantity)).toFixed(2)}
              </span>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processando..." : "Finalizar Compra"}
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
              {error}
            </div>
          )}

          {preferenceId && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm font-medium text-green-800">
                Pedido criado com sucesso!
              </p>
              <div className="mt-3">
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() =>
                    window.open(
                      `https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=${preferenceId}`,
                      "_blank"
                    )
                  }
                >
                  Ir para Pagamento
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center text-xs text-gray-500 mt-4 pt-4 border-t">
            <ShieldCheck className="h-4 w-4 mr-1 text-green-500" />
            <span>Pagamento 100% seguro via Mercado Pago</span>
          </div>
        </CardContent>
      </form>
      <CardFooter className="bg-gray-50 flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <Shield className="h-4 w-4 mr-1 text-gray-400" />
          <p>Transação protegida</p>
        </div>
      </CardFooter>
    </Card>
  );
}
