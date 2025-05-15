import { NextResponse } from "next/server"

// Definindo a variável de ambiente para o ambiente de preview
const MP_ACCESS_TOKEN = "APP_USR-8763992820020207-051422-7b0448168a3ef666fbfab171e478bc0d-1074432483"

export async function POST(request: Request) {
  try {
    // Obter o corpo da requisição como texto para verificação da assinatura
    const bodyText = await request.text()
    const body = JSON.parse(bodyText)

    // Verificar o secret do webhook para segurança
    const signature = request.headers.get("x-signature")
    if (!signature) {
      console.error("Webhook sem assinatura")
      // Retornar 200 para evitar retentativas, mas logar o erro
      return NextResponse.json({ error: "Assinatura não fornecida" }, { status: 200 })
    }

    // Em um ambiente real, verificaríamos a assinatura
    // const isValid = verifyWebhookSignature(signature, bodyText)
    // if (!isValid) {
    //   console.error("Assinatura de webhook inválida")
    //   return NextResponse.json({ error: "Assinatura inválida" }, { status: 200 })
    // }

    console.log("Webhook recebido:", body)

    // Processar apenas notificações de pagamento
    if (body.type === "payment" && body.data && body.data.id) {
      const paymentId = body.data.id
      console.log("ID do pagamento:", paymentId)

      // Buscar detalhes do pagamento
      const paymentDetails = await fetchPaymentDetails(paymentId)

      if (paymentDetails) {
        // Verificar se o pagamento é para um pedido válido
        const orderId = paymentDetails.external_reference

        // Em um ambiente real, você verificaria se o pedido existe no seu banco de dados
        // const order = await getOrderFromDatabase(orderId)
        // if (!order) {
        //   console.error("Pedido não encontrado:", orderId)
        //   return NextResponse.json({ error: "Pedido não encontrado" }, { status: 200 })
        // }

        // Processar o pagamento de acordo com o status
        await processPayment(paymentDetails)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro no webhook:", error)
    // Retornar 200 para evitar retentativas, mas logar o erro
    return NextResponse.json({ error: "Erro interno" }, { status: 200 })
  }
}

async function fetchPaymentDetails(paymentId: string) {
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error("Falha ao obter detalhes do pagamento")
    }

    return await response.json()
  } catch (error) {
    console.error("Erro ao buscar detalhes do pagamento:", error)
    return null
  }
}

async function processPayment(paymentData: any) {
  // Extrair informações importantes
  const { id, status, status_detail, external_reference, transaction_amount, payment_method_id } = paymentData

  console.log(`Processando pagamento ${id} para pedido ${external_reference}`)
  console.log(`Status: ${status}, Detalhe: ${status_detail}`)
  console.log(`Valor: ${transaction_amount}, Método: ${payment_method_id}`)

  // Em um ambiente real, você atualizaria o status do pedido no banco de dados
  // e realizaria ações como enviar e-mails, liberar acesso ao produto, etc.

  // Exemplo:
  switch (status) {
    case "approved":
      // await updateOrderStatus(external_reference, "paid")
      // await sendOrderConfirmationEmail(external_reference)
      // await grantProductAccess(external_reference)
      console.log(`Pagamento aprovado para pedido ${external_reference}`)
      break
    case "pending":
      // await updateOrderStatus(external_reference, "pending")
      console.log(`Pagamento pendente para pedido ${external_reference}`)
      break
    case "rejected":
      // await updateOrderStatus(external_reference, "failed")
      // await sendPaymentFailedEmail(external_reference)
      console.log(`Pagamento rejeitado para pedido ${external_reference}`)
      break
    default:
      console.log(`Status de pagamento não tratado: ${status}`)
  }

  // Registrar a transação para auditoria
  const transactionLog = {
    payment_id: id,
    order_id: external_reference,
    status,
    amount: transaction_amount,
    payment_method: payment_method_id,
    timestamp: new Date().toISOString(),
  }

  console.log("Log de transação:", transactionLog)
  // Em um ambiente real: await saveTransactionLog(transactionLog)
}
