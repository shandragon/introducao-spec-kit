import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';

const ENV_PATH = path.resolve(process.cwd(), '.env');
const SECRET_KEY = 'JWT_SECRET';

async function generateSecret() {
  try {
    const secret = crypto.randomBytes(64).toString('hex');
    let envContent = '';

    try {
      envContent = await fs.readFile(ENV_PATH, 'utf-8');
    } catch (err) {
      // Arquivo não existe, vamos criar um novo
    }

    if (envContent.includes(`${SECRET_KEY}=`)) {
      console.log(`⚠️  ${SECRET_KEY} já existe no arquivo .env. Nenhuma alteração foi feita.`);
      return;
    }

    const newLine = envContent.endsWith('\n') || envContent.length === 0 ? '' : '\n';
    await fs.appendFile(ENV_PATH, `${newLine}${SECRET_KEY}=${secret}\n`);

    console.log('✅ JWT_SECRET gerado com sucesso e adicionado ao seu .env!');
    console.log('💡 Lembre-se de nunca commitar o arquivo .env com segredos reais.');
  } catch (error) {
    console.error('❌ Erro ao gerar o segredo:', error.message);
    process.exit(1);
  }
}

generateSecret();
