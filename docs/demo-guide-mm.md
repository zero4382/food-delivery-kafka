# Presentation နဲ့ Demo လုပ်နည်း

## Project ကို စဖွင့်ရန်

Terminal တစ်ခုဖွင့်ပြီး project folder ထဲကနေ ဒီ command ကို run ပါ။

```bash
docker compose up --build
```

`Order service listening` နဲ့ consumer service သုံးခုလုံး `waiting for order updates` လို့ပေါ်လာတဲ့အထိ စောင့်ပါ။ ဒီ terminal ကို မပိတ်ပါနဲ့။

## ပုံမှန် Order Update ပြရန်

Terminal အသစ်တစ်ခုဖွင့်ပြီး ဒီ command ကို run ပါ။

```bash
./scripts/send-update.sh 101 PREPARING
```

ပထမ terminal မှာ Customer၊ Rider နဲ့ Notification သုံးခုလုံး Order 101 ကိုရကြောင်း ပြပါ။

ပြောရန်စာတို:

> The Order Service published one event to Kafka. All three services received the same update.

## Rider ပိတ်ထားသည့် Demo

Rider Service တစ်ခုတည်းကို ပိတ်ပါ။

```bash
docker compose stop rider-consumer
```

Order 202 ကို READY ပြောင်းပါ။

```bash
./scripts/send-update.sh 202 READY
```

Customer နဲ့ Notification က update ရပြီး Rider က မရသေးတာကို ပြပါ။

Rider Service ကို ပြန်ဖွင့်ပါ။

```bash
docker compose start rider-consumer
```

စက္ကန့် ၂၀ လောက်စောင့်ပြီး Rider ရဲ့ output ကိုပြပါ။

```bash
sleep 20
docker compose logs --tail=20 rider-consumer
```

အောက်ကစာပေါ်လာရမယ်။

```text
Rider action: Pick up Order 202
```

ပြောရန်စာတို:

> The Rider Service was offline when we published the READY event. Kafka kept the event. After the Rider Service restarted, it received the missed update.

## Presentation ပြီးလျှင် Project ပိတ်ရန်

```bash
docker compose down
```

## Member သုံးယောက် ပြောရန်

- Hsu Shwe Yaung: Title၊ scenario နဲ့ pain point ကို ၃ မိနစ်ခန့်ရှင်းပြရန်
- Soe Thura Lwin: Kafka နဲ့ implementation ကို ၃ မိနစ်ခန့်ရှင်းပြရန်
- Khaing Zaw Lin: Live demo နဲ့ result ကို ၄ မိနစ်ခန့်ပြရန်

Presentation မစခင် `docker compose up --build` ကို အရင် run ထားပြီး demo commands တွေကို စာရွက်တစ်ရွက်ပေါ်မှာ အစဉ်လိုက်ရေးထားပါ။
