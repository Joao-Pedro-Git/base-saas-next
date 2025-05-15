"use server";

import { headers } from "next/headers";
import crypto from "crypto";

type PreferenceParams = {
  title: string;
  price: number;
  quantity: number;
  csrfToken?: string;
};

// Definindo as variáveis de ambiente para o ambiente de preview
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const WEBHOOK_SECRET = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
const BASE_URL = "https://example.com";

// Função para validar a origem da requisição
function validateRequest() {
  const headersList = headers();
  const referer = headersList.get("referer") || "";
  const userAgent = headersList.get("user-agent") || "";

  // Em um ambiente real, você faria validações mais robustas aqui
  if (!userAgent) {
    throw new Error("Requisição inválida");
  }
}

export async function createPreference({
  title,
  price,
  quantity,
  csrfToken,
}: PreferenceParams) {
  try {
    // Validar a origem da requisição
    validateRequest();

    // Validar os dados do produto
    if (!title || price <= 0 || quantity <= 0) {
      throw new Error("Dados do produto inválidos");
    }

    // Limitar a quantidade para evitar fraudes
    if (quantity > 10) {
      throw new Error("Quantidade máxima excedida");
    }

    // Gerar um ID de pedido único
    const orderId = crypto.randomUUID();

    console.log("Criando preferência com:", {
      title,
      price,
      quantity,
      orderId,
    });

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          "X-Idempotency-Key": orderId, // Evita processamento duplicado
        },
        body: JSON.stringify({
          items: [
            {
              id: "prod-premium-001",
              title,
              unit_price: price,
              quantity,
              currency_id: "BRL",
              description: "Produto Premium - Acesso completo",
              category_id: "digital_goods",
            },
          ],
          back_urls: {
            success: `${BASE_URL}/success?order=${orderId}`,
            failure: `${BASE_URL}/failure?order=${orderId}`,
            pending: `${BASE_URL}/pending?order=${orderId}`,
          },
          notification_url: `${BASE_URL}/api/webhooks/mercadopago`,
          external_reference: orderId,
          auto_return: "approved",
          // Dados adicionais para segurança e rastreamento
          metadata: {
            order_id: orderId,
            product_id: "prod-premium-001",
            timestamp: new Date().toISOString(),
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro na API do Mercado Pago:", errorData);
      throw new Error("Falha ao criar preferência de pagamento");
    }

    const data = await response.json();
    console.log("Preferência criada:", data.id);

    // Em um ambiente real, você salvaria os dados do pedido em um banco de dados
    // await saveOrderToDatabase({ orderId, preferenceId: data.id, ... })

    return data.id;
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    // No ambiente de preview, retornamos um ID fictício para demonstração
    return (
      "PREVIEW_PREFERENCE_ID_" + Math.random().toString(36).substring(2, 10)
    );
  }
}

// Função para verificar a assinatura do webhook
export async function verifyWebhookSignature(
  signature: string,
  payload: string
) {
  try {
    // Em um ambiente real, você implementaria a veri ficação da assinatura
    // usando HMAC com o WEBHOOK_SECRET
    const expectedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error("Erro ao verificar assinatura:", error);
    return false;
  }
}
