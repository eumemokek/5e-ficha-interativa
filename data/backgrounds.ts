
import { BackgroundDefinition, SkillName } from '../types';

export const BACKGROUNDS: Record<string, BackgroundDefinition> = {
    'Acólito': {
        name: 'Acólito',
        skills: [SkillName.Insight, SkillName.Religion],
        equipment: ['Símbolo Sagrado', 'Livro de preces', '5 varetas de incenso', 'Vestes', 'Roupas comuns', 'Algibeira (15 po)'],
        feature: { name: 'Abrigo dos Fiéis', description: 'Cura e cuidados gratuitos em templos da sua fé.' }
    },
    'Charlatão': {
        name: 'Charlatão',
        skills: [SkillName.Deception, SkillName.SleightOfHand],
        equipment: ['Roupas finas', 'Kit de Disfarce', 'Ferramentas de trapaça', 'Algibeira (15 po)'],
        feature: { name: 'Identidade Falsa', description: 'Possui uma segunda identidade completa com documentos.' }
    },
    'Criminoso': {
        name: 'Criminoso',
        skills: [SkillName.Deception, SkillName.Stealth],
        equipment: ['Pé de cabra', 'Roupas escuras com capuz', 'Algibeira (15 po)'],
        tools: ['Ferramentas de Ladrão'],
        feature: { name: 'Contato Criminal', description: 'Rede de contatos no submundo.' }
    },
    'Artista': {
        name: 'Artista',
        skills: [SkillName.Acrobatics, SkillName.Performance],
        equipment: ['Instrumento musical', 'Presente de admirador', 'Roupa de apresentação', 'Algibeira (15 po)'],
        feature: { name: 'Pela Demanda Popular', description: 'Pode encontrar lugar para atuar e receber hospedagem/comida.' }
    },
    'Herói do Povo': {
        name: 'Herói do Povo',
        skills: [SkillName.AnimalHandling, SkillName.Survival],
        equipment: ['Ferramentas de artesão', 'Pá', 'Pote de ferro', 'Roupas comuns', 'Algibeira (10 po)'],
        feature: { name: 'Hospitalidade Rústica', description: 'Pode encontrar abrigo entre o povo comum.' }
    },
    'Artesão de Guilda': {
        name: 'Artesão de Guilda',
        skills: [SkillName.Insight, SkillName.Persuasion],
        equipment: ['Ferramentas de artesão', 'Carta da guilda', 'Roupas de viajante', 'Algibeira (15 po)'],
        feature: { name: 'Membro da Guilda', description: 'Apoio da guilda, hospedagem e proteção legal.' }
    },
    'Eremita': {
        name: 'Eremita',
        skills: [SkillName.Medicine, SkillName.Religion],
        equipment: ['Estojo de pergaminho', 'Cobertor de inverno', 'Roupas comuns', 'Kit de herbalismo', 'Algibeira (5 po)'],
        feature: { name: 'Descoberta', description: 'Você conhece um segredo importante do multiverso.' }
    },
    'Nobre': {
        name: 'Nobre',
        skills: [SkillName.History, SkillName.Persuasion],
        equipment: ['Roupas finas', 'Anel de sinete', 'Pergaminho de pedigree', 'Algibeira (25 po)'],
        feature: { name: 'Posição de Privilégio', description: 'É bem recebido na alta sociedade e plebeus tentam agradar.' }
    },
    'Forasteiro': {
        name: 'Forasteiro',
        skills: [SkillName.Athletics, SkillName.Survival],
        equipment: ['Cajado', 'Armadilha de caça', 'Troféu de caça', 'Roupas de viajante', 'Algibeira (10 po)'],
        feature: { name: 'Andarilho', description: 'Excelente memória para mapas e geografia, encontra comida/água para 6.' }
    },
    'Sábio': {
        name: 'Sábio',
        skills: [SkillName.Arcana, SkillName.History],
        equipment: ['Vidro de tinta', 'Pena', 'Faca pequena', 'Carta de um colega morto', 'Roupas comuns', 'Algibeira (10 po)'],
        feature: { name: 'Pesquisador', description: 'Sabe onde encontrar informações que não possui.' }
    },
    'Marinheiro': {
        name: 'Marinheiro',
        skills: [SkillName.Athletics, SkillName.Perception],
        equipment: ['Malagueta (clava)', 'Corda de seda (15m)', 'Amuleto da sorte', 'Roupas comuns', 'Algibeira (10 po)'],
        feature: { name: 'Passagem de Navio', description: 'Pode conseguir passagem gratuita em navios para você e grupo.' }
    },
    'Soldado': {
        name: 'Soldado',
        skills: [SkillName.Athletics, SkillName.Intimidation],
        equipment: ['Insígnia de Posto', 'Troféu de inimigo', 'Jogo de dados', 'Roupas comuns', 'Algibeira (10 po)'],
        feature: { name: 'Patente Militar', description: 'Possui patente e influência sobre soldados de posto inferior.' }
    },
    'Morador de Rua': {
        name: 'Morador de Rua',
        skills: [SkillName.SleightOfHand, SkillName.Stealth],
        equipment: ['Faca pequena', 'Mapa da cidade', 'Rato de estimação', 'Roupas comuns', 'Algibeira (10 po)'],
        feature: { name: 'Segredos da Cidade', description: 'Conhece padrões, atalhos e fluxo urbano melhor que ninguém.' }
    }
};
