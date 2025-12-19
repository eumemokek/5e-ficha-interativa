
import { FeatureDefinition, Attribute, SkillName } from '../types';

export const FEATURE_OPTIONS: Record<string, FeatureDefinition> = {
    // --- RAÇAS ---
    'Treinamento Kenku': {
        key: 'Treinamento Kenku',
        selectionLimit: 2,
        options: [
            { name: 'Acrobacia', description: 'Você ganha proficiência na perícia Acrobacia.', skillsAdded: [SkillName.Acrobatics] },
            { name: 'Enganação', description: 'Você ganha proficiência na perícia Enganação.', skillsAdded: [SkillName.Deception] },
            { name: 'Furtividade', description: 'Você ganha proficiência na perícia Furtividade.', skillsAdded: [SkillName.Stealth] },
            { name: 'Prestidigitação', description: 'Você ganha proficiência na perícia Prestidigitação.', skillsAdded: [SkillName.SleightOfHand] }
        ]
    },

    // --- COMBATE GERAL ---
    'Estilo de Luta': {
        key: 'Estilo de Luta',
        selectionLimit: 1,
        options: [
            { 
                name: 'Arquearia', 
                description: 'Você ganha +2 de bônus nas jogadas de ataque realizadas com uma arma de ataque à distância.',
                featuresAdded: [{ name: 'Arquearia', description: '+2 ataque à distância', modifiers: [{ type: 'bonus', target: 'weapon_proficiency', value: 2 }] }] // Placeholder
            },
            { 
                name: 'Defesa', 
                description: 'Enquanto estiver usando armadura, você ganha +1 de bônus em sua CA.',
                featuresAdded: [{ 
                    name: 'Bônus de Defesa', 
                    description: '+1 na CA quando usando armadura.',
                    modifiers: [{ type: 'bonus', target: 'ac', value: 1, condition: 'armored' }] 
                }]
            },
            { name: 'Duelismo', description: 'Quando você empunhar uma arma de ataque corpo-a-corpo em uma mão e nenhuma outra arma, você ganha +2 de bônus nas jogadas de dano com essa arma.' },
            { name: 'Combate com Duas Armas', description: 'Quando você estiver engajado em combate com duas armas, você pode adicionar o seu modificador de habilidade na jogada de dano do seu segundo ataque.' },
            { name: 'Proteção', description: 'Quando uma criatura que você possa ver atacar um alvo que não seja você e que esteja a até 1,5 metro de você, você pode usar sua reação para impor desvantagem nas jogadas de ataque da criatura. Você deve estar empunhando um escudo.' },
            { name: 'Combate com Armas Grandes', description: 'Quando você rolar um 1 ou um 2 num dado de dano de um ataque com arma corpo-a-corpo que você esteja empunhando com duas mãos, você pode rolar o dado de novo e deve usar a nova rolagem.' }
        ]
    },

    // --- BRUXO ---
    'Invocações Místicas': {
        key: 'Invocações Místicas',
        selectionLimit: 2, // Base, aumenta com nível
        options: [
            { name: 'Armadura das Sombras', description: 'Você pode conjurar Armadura Arcana em si mesmo à vontade.', spellsAdded: ['Armadura Arcana'] },
            { name: 'Explosão Agonizante', description: 'Adicione modificador de Carisma ao dano da Rajada Mística.' },
            { name: 'Visão Diabólica', description: 'Ver na escuridão mágica e não mágica até 36m.' },
            { name: 'Vigor do Demônio', description: 'Conjurar Vitalidade Falsa à vontade.', spellsAdded: ['Vitalidade Falsa'] },
            { name: 'Máscara das Muitas Faces', description: 'Conjurar Disfarçar-se à vontade.', spellsAdded: ['Disfarçar-se'] },
            { name: 'Sussurros da Sepultura', description: 'Conjurar Falar com os Mortos à vontade.', spellsAdded: ['Falar com os Mortos'] },
            { name: 'Livro de Segredos Antigos', description: 'Rituais de qualquer classe (requer Pacto do Tomo).' },
            { name: 'Lâmina Sedenta', description: 'Ataque extra com arma de pacto (Requer nv 5).' },
            { name: 'Uno com as Sombras', description: 'Ficar invisível em escuridão imóvel.' },
            { name: 'Salto do Outro Mundo', description: 'Conjura Salto à vontade.', spellsAdded: ['Salto'] },
            { name: 'Olhar de Duas Mentes', description: 'Toque um humanoide para ver pelos seus sentidos.' }
        ]
    },
    'Patrono de Outro Mundo': {
        key: 'Patrono de Outro Mundo',
        selectionLimit: 1,
        options: [
            { name: 'O Feérico', description: 'Ilusão.', spellsAdded: ['Fogo das Fadas', 'Sono'], featuresAdded: [{ name: 'Presença Feérica', description: 'Amedrontar/Encantar em área.' }] },
            { name: 'O Infernal', description: 'Fogo.', spellsAdded: ['Mãos Flamejantes', 'Comando'], featuresAdded: [{ name: 'Bênção do Tenebroso', description: 'PV temp ao matar.' }] },
            { name: 'O Grande Antigo', description: 'Mente.', spellsAdded: ['Sussurros Dissonantes', 'Riso Histérico de Tasha'], featuresAdded: [{ name: 'Mente Desperta', description: 'Telepatia.' }] }
        ]
    },
    'Dádiva de Pacto': {
        key: 'Dádiva de Pacto',
        selectionLimit: 1,
        options: [
            { name: 'Pacto da Lâmina', description: 'Arma mágica.' },
            { name: 'Pacto da Corrente', description: 'Familiar especial.', spellsAdded: ['Convocar Familiar'] },
            { name: 'Pacto do Tomo', description: 'Grimório com truques.' }
        ]
    },

    // --- FEITICEIRO ---
    'Metamágica': {
        key: 'Metamágica',
        selectionLimit: 2, // Base, aumenta com nível
        options: [
            { name: 'Magia Acelerada', description: 'Conjurar magia de ação como ação bônus (2 pts).' },
            { name: 'Magia Cuidadosa', description: 'Proteger aliados de efeitos de área (1 pt).' },
            { name: 'Magia Distante', description: 'Dobrar alcance ou Toque vira 9m (1 pt).' },
            { name: 'Magia Duplicada', description: 'Dois alvos para magia de alvo único (pts = nível).' },
            { name: 'Magia Estendida', description: 'Dobrar duração (1 pt).' },
            { name: 'Magia Sutil', description: 'Sem componentes verbais/somáticos (1 pt).' },
            { name: 'Magia Potencializada', description: 'Rerrolar dados de dano (1 pt).' },
            { name: 'Magia Elevada', description: 'Desvantagem no save do alvo (3 pts).' }
        ]
    },
    'Origem de Feitiçaria': {
        key: 'Origem de Feitiçaria',
        selectionLimit: 1,
        options: [
            { 
                name: 'Linhagem Dracônica', 
                description: 'Escamas de dragão.', 
                featuresAdded: [
                    { 
                        name: 'Resiliência Dracônica', 
                        description: '+1 PV/nível, CA 13+Des.',
                        modifiers: [
                            { type: 'formula', target: 'ac', value: 13, condition: 'unarmored' },
                            { type: 'bonus', target: 'hp_per_level', value: 1 }
                        ]
                    }, 
                    { name: 'Ancestral Dracônico', description: 'Escolha a cor do seu ancestral.' } // Trigger nested choice
                ] 
            },
            { name: 'Magia Selvagem', description: 'Caos.', featuresAdded: [{ name: 'Surto de Magia', description: 'Efeito aleatório.' }, { name: 'Marés de Caos', description: 'Vantagem 1x.' }] }
        ]
    },
    'Ancestral Dracônico': {
        key: 'Ancestral Dracônico',
        selectionLimit: 1,
        options: [
            { name: 'Negro (Ácido)', description: 'Resistência a Ácido no nv 6.' },
            { name: 'Azul (Elétrico)', description: 'Resistência a Elétrico no nv 6.' },
            { name: 'Latão (Fogo)', description: 'Resistência a Fogo no nv 6.' },
            { name: 'Bronze (Elétrico)', description: 'Resistência a Elétrico no nv 6.' },
            { name: 'Cobre (Ácido)', description: 'Resistência a Ácido no nv 6.' },
            { name: 'Ouro (Fogo)', description: 'Resistência a Fogo no nv 6.' },
            { name: 'Verde (Veneno)', description: 'Resistência a Veneno no nv 6.' },
            { name: 'Vermelho (Fogo)', description: 'Resistência a Fogo no nv 6.' },
            { name: 'Prata (Frio)', description: 'Resistência a Frio no nv 6.' },
            { name: 'Branco (Frio)', description: 'Resistência a Frio no nv 6.' }
        ]
    },

    // --- GUERREIRO ---
    'Manobras': {
        key: 'Manobras',
        selectionLimit: 3, // Base
        options: [
            { name: 'Aparar', description: 'Reação para reduzir dano.' },
            { name: 'Ataque de Desarmar', description: 'Força alvo a largar item.' },
            { name: 'Ataque de Precisão', description: 'Adiciona dado ao ataque.' },
            { name: 'Ataque de Derrubar', description: 'Derruba alvo.' },
            { name: 'Ataque Ameaçador', description: 'Amedronta alvo.' },
            { name: 'Contra-Ataque', description: 'Reação para atacar quem errou.' },
            { name: 'Inspirar', description: 'Dá PV temp a aliado.' },
            { name: 'Ataque de Finta', description: 'Vantagem no ataque e dano extra.' },
            { name: 'Ataque de Estocada', description: 'Aumenta alcance em 1,5m.' },
            { name: 'Passo do Comandante', description: 'Aliado ataca com reação.' },
            { name: 'Ataque de Manobra', description: 'Aliado move metade deslocamento sem atq oportunidade.' }
        ]
    },
    'Arquétipo Marcial': {
        key: 'Arquétipo Marcial',
        selectionLimit: 1,
        options: [
            { name: 'Campeão', description: 'Crítico em 19-20.', featuresAdded: [{ name: 'Crítico Aprimorado', description: 'Crítico 19-20.' }] },
            { name: 'Mestre de Batalha', description: 'Usa manobras.', featuresAdded: [{ name: 'Manobras', description: 'Escolha 3 manobras.' }, { name: 'Superioridade em Combate', description: '4 dados d8.' }] },
            { name: 'Cavaleiro Místico', description: 'Usa magia.', spellsAdded: ['Mãos Mágicas', 'Escudo Arcano', 'Mísseis Mágicos'] } 
        ]
    },

    // --- LADINO ---
    'Arquétipo de Ladino': {
        key: 'Arquétipo de Ladino',
        selectionLimit: 1,
        options: [
            { 
                name: 'Ladrão', 
                description: 'Mãos rápidas.', 
                featuresAdded: [{ name: 'Mãos Rápidas', description: 'Uso de item como bônus.' }, { name: 'Andarilho', description: 'Escalar não custa extra.' }] 
            },
            { name: 'Assassino', description: 'Dano crítico.', featuresAdded: [{ name: 'Assassinato', description: 'Crítico em surpresa.' }] },
            { name: 'Trapaceiro Arcano', description: 'Magia.', spellsAdded: ['Mãos Mágicas', 'Ilusão Menor', 'Disfarçar-se', 'Enfeitiçar Pessoa'] }
        ]
    },

    // --- CLÉRIGO ---
    'Domínio Divino': {
        key: 'Domínio Divino',
        selectionLimit: 1,
        options: [
            { 
                name: 'Vida', 
                description: 'Mestre da cura. Proficiência com Armadura Pesada.', 
                spellsAdded: ['Bênção', 'Curar Ferimentos'], 
                featuresAdded: [
                    { name: 'Discípulo da Vida', description: 'Cura adicional de 2 + nível da magia.' },
                    { name: 'Proficiência Bônus: Armadura Pesada', description: 'Domínio da Vida', modifiers: [{ type: 'proficiency', target: 'armor_proficiency', subtarget: 'heavy' }] }
                ] 
            },
            { 
                name: 'Guerra', 
                description: 'Guerreiro divino. Armadura Pesada e Armas Marciais.', 
                spellsAdded: ['Auxílio Divino', 'Escudo da Fé'], 
                featuresAdded: [
                    { name: 'Sacerdote da Guerra', description: 'Ataque extra com ação bônus (limitado).' },
                    { name: 'Proficiência Bônus', description: 'Armaduras Pesadas e Armas Marciais.', modifiers: [{ type: 'proficiency', target: 'armor_proficiency', subtarget: 'heavy' }] }
                ] 
            },
            { 
                name: 'Luz', 
                description: 'Fogo purificador.', 
                spellsAdded: ['Mãos Flamejantes', 'Fogo das Fadas', 'Luz'], 
                featuresAdded: [{ name: 'Reação de Proteção', description: 'Cega atacante.' }] 
            },
            { 
                name: 'Tempestade', 
                description: 'Raios e trovões. Armadura Pesada.', 
                spellsAdded: ['Névoa', 'Onda Trovejante'], 
                featuresAdded: [
                    { name: 'Ira da Tempestade', description: 'Reação causa dano elétrico.' },
                    { name: 'Proficiência Bônus: Armadura Pesada', description: 'Domínio da Tempestade', modifiers: [{ type: 'proficiency', target: 'armor_proficiency', subtarget: 'heavy' }] }
                ]
            },
            { 
                name: 'Natureza', 
                description: 'Protetor natural. Armadura Pesada e uma perícia.', 
                spellsAdded: ['Amizade Animal', 'Falar com Animais'],
                featuresAdded: [
                    { name: 'Acólito da Natureza', description: 'Proficiência em Adestrar Animais, Natureza ou Sobrevivência (escolha manual) e Armadura Pesada.', modifiers: [{ type: 'proficiency', target: 'armor_proficiency', subtarget: 'heavy' }] }
                ]
            },
            { 
                name: 'Enganação', 
                description: 'Ilusões.', 
                spellsAdded: ['Enfeitiçar Pessoa', 'Disfarçar-se'], 
                featuresAdded: [{ name: 'Bênção do Trapaceiro', description: 'Vantagem em furtividade para outro.' }] 
            },
            {
                name: 'Túmulo',
                description: 'Guardião da linha entre vida e morte. Você detecta mortos-vivos e maximiza cura em aliados moribundos.',
                spellsAdded: ['Vitalidade Falsa', 'Raio de Doença'],
                featuresAdded: [
                    { name: 'Círculo da Mortalidade', description: 'Quando você conjura uma magia de cura em uma criatura com 0 PV, você rola o dado de cura como se tivesse tirado o valor máximo.' },
                    { name: 'Olhos da Sepultura', description: 'Detecta mortos-vivos (Sabedoria vezes/longo).' }
                ]
            }
        ]
    },

    // --- DRUIDA ---
    'Círculo Druídico': {
        key: 'Círculo Druídico',
        selectionLimit: 1,
        options: [
            { name: 'Círculo da Terra', description: 'Conjurador.', featuresAdded: [{ name: 'Truque Bônus', description: '+1 Truque' }, { name: 'Recuperação Natural', description: 'Recupera slots.' }] },
            { name: 'Círculo da Lua', description: 'Fera de combate.', featuresAdded: [{ name: 'Forma de Combate', description: 'Ação bônus, ND maior.' }] }
        ]
    },

    // --- BÁRBARO ---
    'Caminho Primitivo': {
        key: 'Caminho Primitivo',
        selectionLimit: 1,
        options: [
            { name: 'Berserker', description: 'Fúria violenta.', featuresAdded: [{ name: 'Frenezi', description: 'Ataque extra como bônus (exaustão).' }] },
            { 
                name: 'Totêmico', 
                description: 'Espíritos guias.', 
                featuresAdded: [
                    { name: 'Espírito Totêmico', description: 'Escolha um totem (Urso, Águia, Lobo).' }, // Trigger nested choice
                    { name: 'Falar com os Espíritos', description: 'Pode conjurar Falar com Animais e Sentidos da Besta como ritual.' }
                ] 
            }
        ]
    },
    'Espírito Totêmico': {
        key: 'Espírito Totêmico',
        selectionLimit: 1,
        options: [
            { name: 'Urso', description: 'Enquanto em fúria, você tem resistência a todos os danos, exceto psíquico.' },
            { name: 'Águia', description: 'Enquanto em fúria e sem armadura pesada, outros têm desvantagem em atq de oportunidade contra você, e você pode usar a ação Disparada como bônus.' },
            { name: 'Lobo', description: 'Enquanto em fúria, seus aliados têm vantagem em ataques corpo-a-corpo contra inimigos a 1,5m de você.' }
        ]
    },

    // --- PALADINO ---
    'Juramento Sagrado': {
        key: 'Juramento Sagrado',
        selectionLimit: 1,
        options: [
            { name: 'Devoção', description: 'Cavaleiro clássico.', spellsAdded: ['Proteção contra o Bem e Mal', 'Santuário'], featuresAdded: [{ name: 'Arma Sagrada', description: '+Carisma no ataque.' }] },
            { name: 'Anciões', description: 'Cavaleiro verde.', spellsAdded: ['Ataque Restringente', 'Falar com Animais'], featuresAdded: [{ name: 'Ira da Natureza', description: 'Prender inimigos.' }] },
            { name: 'Vingança', description: 'Justiceiro.', spellsAdded: ['Marca do Caçador', 'Maldição'], featuresAdded: [{ name: 'Voto de Inimizade', description: 'Vantagem no ataque.' }] }
        ]
    },

    // --- RANGER ---
    'Arquétipo de Ranger': {
        key: 'Arquétipo de Ranger',
        selectionLimit: 1,
        options: [
            { 
                name: 'Caçador', 
                description: 'Mestre do combate marcial.', 
                featuresAdded: [
                    { name: 'Presa do Caçador', description: 'Escolha uma técnica de caça.' } // Trigger nested choice
                ] 
            },
            { name: 'Mestre das Feras', description: 'Companheiro.', featuresAdded: [{ name: 'Companheiro Animal', description: 'Besta ND 1/4.' }] }
        ]
    },
    'Presa do Caçador': {
        key: 'Presa do Caçador',
        selectionLimit: 1,
        options: [
            { name: 'Matador de Colossos', description: 'Uma vez por turno, ao atingir criatura ferida, causa 1d8 extra.' },
            { name: 'Assassino de Gigantes', description: 'Reação para atacar criatura Grande ou maior que erre ataque contra você.' },
            { name: 'Quebrador de Hordas', description: 'Uma vez por turno, faça outro ataque contra criatura diferente a 1,5m da primeira.' }
        ]
    },

    // --- MONGE ---
    'Tradição Monástica': {
        key: 'Tradição Monástica',
        selectionLimit: 1,
        options: [
            { name: 'Caminho da Mão Aberta', description: 'Controle de campo.', featuresAdded: [{ name: 'Técnica da Mão Aberta', description: 'Derrubar ou empurrar com Rajada de Golpes.' }] },
            { name: 'Caminho das Sombras', description: 'Furtividade.', featuresAdded: [{ name: 'Artes das Sombras', description: 'Conjura Escuridão, Passos sem Pegadas, Silêncio, Visão no Escuro (2 ki).' }] },
            { name: 'Caminho dos Quatro Elementos', description: 'Magia elemental.', featuresAdded: [{ name: 'Disciplinas Elementais', description: 'Escolha suas magias elementais.' }] }
        ]
    },
    'Disciplinas Elementais': {
        key: 'Disciplinas Elementais',
        selectionLimit: 4, // Exemplo, varia por nível, mas dando base alta
        options: [
            { name: 'Presas da Serpente de Fogo', description: 'Alcance +3m, dano fogo.' },
            { name: 'Punho dos Quatro Trovões', description: 'Conjura Onda Trovejante (2 ki).' },
            { name: 'Varrida de Cinzas', description: 'Conjura Mãos Flamejantes (2 ki).' },
            { name: 'Chicote de Água', description: 'Dano e puxa criatura.' },
            { name: 'Gongo do Cume', description: 'Conjura Despedaçar (3 ki).' }
        ]
    }
};
