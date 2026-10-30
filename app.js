/**
 * 내 카톡방의 그림자: ‘고유어 생존율 테스트’
 * Interactive Messenger Simulation + Saturation Engine + Replay Restoration Mode
 */

// --- Web Audio Synthesizer for Tactile UI Feedback ---
class SoundFX {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop(freq = 520, duration = 0.08) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.35, this.ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playShadowDrop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(290, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(155, this.ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.24);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.24);
  }

  playSparkleRestore() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((note, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const startTime = this.ctx.currentTime + idx * 0.055;
      osc.frequency.setValueAtTime(note, startTime);
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.28);
    });
  }

  playReceiptPrint() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    for (let i = 0; i < 6; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const t = this.ctx.currentTime + i * 0.045;
      osc.frequency.setValueAtTime(180 + i * 25, t);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.035);
    }
  }
}

const sfx = new SoundFX();

// --- Native Korean Word Card Database ---
const WORD_CARDS_DB = {
  legend_best: {
    id: 'legend_best',
    category: '외래어 · 한자어',
    beforeLabel: '레전드 / 최고',
    cards: [
      {
        word: '으뜸',
        pos: '명사 · 고유어',
        meaning: '많은 것 가운데 가장 뛰어난 것, 또는 첫째가는 것',
        example: '예) "오늘 급식 차림은 단연 으뜸이네!"'
      },
      {
        word: '첫손가락',
        pos: '명사 · 고유어',
        meaning: '여럿 가운데서 첫째로 꼽을 만한 훌륭한 것',
        example: '예) "우리 학교 급식은 언제나 첫손가락에 꼽히지!"'
      }
    ]
  },
  real_totally: {
    id: 'real_totally',
    category: '한자어 · 속어',
    beforeLabel: '완전 / 진짜',
    cards: [
      {
        word: '참으로',
        pos: '부사 · 고유어',
        meaning: '조금도 거짓이 없이 사실대로, 정말로 아주',
        example: '예) "오늘 메뉴가 참으로 마음에 든다!"'
      },
      {
        word: '더할 나위 없이',
        pos: '관용구 · 고유어',
        meaning: '더 보탤 것이 없을 정도로 아주 만족스럽게',
        example: '예) "오늘 점심은 더할 나위 없이 훌륭하네!"'
      }
    ]
  },
  store_snack: {
    id: 'store_snack',
    category: '한자어',
    beforeLabel: '매점 간식',
    cards: [
      {
        word: '주전부리',
        pos: '명사 · 고유어',
        meaning: '끼니 외에 심심풀이로 먹는 군음식이나 먹을거리',
        example: '예) "점심 먹고 주전부리하러 같이 가자!"'
      },
      {
        word: '입가심거리',
        pos: '명사 · 고유어',
        meaning: '음식을 먹은 뒤에 입안을 개운하게 하려고 먹는 먹을거리',
        example: '예) "밥 다 먹었으니 달콤한 입가심거리 사러 갈래?"'
      }
    ]
  },
  day_after_tomorrow: {
    id: 'day_after_tomorrow',
    category: '겹말 · 시간 표현',
    beforeLabel: '내일 모레',
    cards: [
      {
        word: '글피',
        pos: '명사 · 고유어',
        meaning: '모레의 다음 날 (오늘로부터 사흘 뒤)',
        example: '예) "국어 모둠 발표가 글피로 바뀌었대!"'
      },
      {
        word: '사흘 뒤',
        pos: '명사구 · 고유어',
        meaning: '오늘부터 세 날이 지난 뒤',
        example: '예) "다행히 발표가 사흘 뒤로 늦춰졌어!"'
      }
    ]
  },
  postpone_delay: {
    id: 'postpone_delay',
    category: '한자어',
    beforeLabel: '연기됐어 / 미뤘어',
    cards: [
      {
        word: '물리셨어',
        pos: '동사 · 고유어 (물리다)',
        meaning: '정해진 날짜나 시간을 뒤로 늦추다',
        example: '예) "선생님이 발표 날짜를 다음 날로 물리셨어."'
      },
      {
        word: '늦추셨어',
        pos: '동사 · 고유어 (늦추다)',
        meaning: '정한 때보다 뒤로 미루어 여유를 두다',
        example: '예) "발표 일정을 사흘 뒤로 늦추셨대!"'
      }
    ]
  },
  free_time: {
    id: 'free_time',
    category: '한자어',
    beforeLabel: '여유 시간 / 빈 시간',
    cards: [
      {
        word: '짬',
        pos: '명사 · 고유어',
        meaning: '어떤 일을 하다가 생각이나 손을 멈추고 쉬는 사이',
        example: '예) "다행히 숨 돌릴 짬이 좀 생겼네!"'
      },
      {
        word: '겨를',
        pos: '명사 · 고유어',
        meaning: '어떤 일을 하는 데 바투 쓰이지 않고 남는 시간',
        example: '예) "이제 발표 자료를 챙길 겨를이 생겼어."'
      }
    ]
  },
  unconditionally_must: {
    id: 'unconditionally_must',
    category: '한자어 · 유행어',
    beforeLabel: '무조건 / 당연히',
    cards: [
      {
        word: '기어이',
        pos: '부사 · 고유어',
        meaning: '어떤 일이 있어도 끝내 본디 마음먹은 대로',
        example: '예) "오늘 방과 후엔 기어이 맛보러 가야지!"'
      },
      {
        word: '두말없이',
        pos: '부사 · 고유어',
        meaning: '이러니저러니 군말을 덧붙이지 않고 바로',
        example: '예) "떡볶이 모임이라면 두말없이 함께해야지!"'
      }
    ]
  },
  recently_lately: {
    id: 'recently_lately',
    category: '한자어',
    beforeLabel: '최근에 / 신상',
    cards: [
      {
        word: '요새',
        pos: '명사/부사 · 고유어',
        meaning: '이제까지의 매우 짧은 동안, 또는 요즘',
        example: '예) "요새 새로 문을 연 떡볶이집 맞지?"'
      },
      {
        word: '접때',
        pos: '명사 · 고유어',
        meaning: '그리 오래지 아니한 지난번 어느 때',
        example: '예) "접때 소문으로만 듣던 그 맛집이구나!"'
      }
    ]
  },
  secret_share: {
    id: 'secret_share',
    category: '한자어 · 외래어',
    beforeLabel: '공유해줘 / 비밀로 알려줘',
    cards: [
      {
        word: '귀띔해 줘',
        pos: '동사 · 고유어 (귀띔하다)',
        meaning: '상대편이 눈치로 알 수 있도록 미리 슬쩍 일러주다',
        example: '예) "어디에 있는지 나한테도 살짝 귀띔해 줘!"'
      },
      {
        word: '일러 줘',
        pos: '동사 · 고유어 (이르다)',
        meaning: '몰랐던 사실이나 길을 깨우쳐 말해 주다',
        example: '예) "맛집 가는 길을 나에게도 살며시 일러 줘!"'
      }
    ]
  },
  worry_concern: {
    id: 'worry_concern',
    category: '한자어 · 신조어',
    beforeLabel: '고민 / 걱정 / 멘붕',
    cards: [
      {
        word: '시름',
        pos: '명사 · 고유어',
        meaning: '마음에 걸려 풀리지 않고 항상 남아 있는 근심과 걱정',
        example: '예) "수학 시험 때문에 시름이 깊어지네."'
      },
      {
        word: '애간장',
        pos: '명사 · 고유어',
        meaning: '몹시 초조하고 애가 타는 마음',
        example: '예) "다음 주 평가 생각만 하면 애간장이 녹는다."'
      }
    ]
  },
  very_much: {
    id: 'very_much',
    category: '한자어 · 속어',
    beforeLabel: '엄청 많아 / 상당히 커',
    cards: [
      {
        word: '이만저만이 아니야',
        pos: '관용구 · 고유어',
        meaning: '상태나 정도가 보통을 훨씬 넘어 대단하다',
        example: '예) "나도 시험 걱정이 이만저만이 아니야."'
      },
      {
        word: '무척 커',
        pos: '부사구 · 고유어',
        meaning: '다른 것과 견줄 수 없이 아주 대단하다',
        example: '예) "이번 단원평가는 부담이 무척 크네."'
      }
    ]
  },
  various_personal: {
    id: 'various_personal',
    category: '한자어',
    beforeLabel: '개인적으로 / 여러 가지',
    cards: [
      {
        word: '온갖',
        pos: '관형사 · 고유어',
        meaning: '있을 수 있는 온통의 모든 여러 가지',
        example: '예) "온갖 옷을 다 살펴봐도 1번이 가장 멋지네!"'
      },
      {
        word: '내 나름대로는',
        pos: '부사구 · 고유어',
        meaning: '제각기 가진 모양이나 분수, 생각대로는',
        example: '예) "내 나름대로는 1번 파란빛 옷이 마음에 들어!"'
      }
    ]
  },
  immediately_rightaway: {
    id: 'immediately_rightaway',
    category: '한자어',
    beforeLabel: '즉시 / 신속히',
    cards: [
      {
        word: '단박에',
        pos: '부사 · 고유어',
        meaning: '가던 길을 멈추지 않고 그 자리에서 곧장 바로',
        example: '예) "종 치기 전에 단박에 다녀오자!"'
      },
      {
        word: '곧장',
        pos: '부사 · 고유어',
        meaning: '중간에 지체하거나 들르지 아니하고 바로',
        example: '예) "복도에서 지체하지 말고 곧장 달려가자!"'
      }
    ]
  },
  okay_agree: {
    id: 'okay_agree',
    category: '외래어 · 한자어',
    beforeLabel: '오케이 / 찬성',
    cards: [
      {
        word: '좋아',
        pos: '감탄/형용사 · 고유어',
        meaning: '상대방의 말이나 제안에 기쁘게 뜻을 같이할 때 쓰는 말',
        example: '예) "좋아! 지금 바로 함께 출발하자!"'
      },
      {
        word: '그거 참 반갑네',
        pos: '관용구 · 고유어',
        meaning: '마음에 들거나 기쁜 제안을 흔쾌히 받아들일 때',
        example: '예) "그거 참 반갑네! 얼른 다녀오자."'
      }
    ]
  },
  meme_slang: {
    id: 'meme_slang',
    category: '신조어 · 유행어 · 밈',
    beforeLabel: '야르렁 / 유행어 / 신조어',
    cards: [
      {
        word: '얼씨구 신난다',
        pos: '관용구 · 고유어',
        meaning: '일이 뜻대로 잘되어 마음이 들뜨고 신바람이 날 때 쓰는 우리말',
        example: '예) "얼씨구 신난다! 오늘 점심시간이 참 기다려지네!"'
      },
      {
        word: '더없이 반갑네',
        pos: '관용구 · 고유어',
        meaning: '더할 수 없이 마음에 들고 기분이 좋을 때 쓰는 고운 표현',
        example: '예) "그 소식 참 더없이 반갑네! 다 함께 가 보자."'
      }
    ]
  },
  bad_curse: {
    id: 'bad_curse',
    category: '비속어 · 거친 표현',
    beforeLabel: '비속어 / 거친 말',
    cards: [
      {
        word: '아이고 아찔해라',
        pos: '감탄구 · 고유어',
        meaning: '뜻밖의 일로 마음이 놀라거나 당황스러울 때 거친 말 대신 쓰는 표현',
        example: '예) "아이고 아찔해라! 시험이 벌써 코앞이네."'
      },
      {
        word: '마음이 무척 쓰이네',
        pos: '관용구 · 고유어',
        meaning: '속이 상하거나 신경이 곤두설 때 비속어 대신 쓰는 고운 우리말',
        example: '예) "이번 발표 준비는 마음이 무척 쓰이네."'
      },
      {
        word: '참으로 놀랍네',
        pos: '관용구 · 고유어',
        meaning: '정도가 아주 심하거나 대단할 때 거친 강조어 대신 쓰는 말',
        example: '예) "오늘 밥차림이 참으로 놀랍네!"'
      }
    ]
  },
  chat_abbrev: {
    id: 'chat_abbrev',
    category: '초성체 · 통신 줄임말',
    beforeLabel: '초성체 / 줄임말',
    cards: [
      {
        word: '방긋',
        pos: '부사 · 고유어',
        meaning: '입을 조금 벌리고 소리 없이 가볍게 웃는 모양',
        example: '예) "친구들과 이야기하니 방긋 웃음이 나네!"'
      },
      {
        word: '기꺼이 함께하자',
        pos: '관용구 · 고유어',
        meaning: '마음속으로 은근히 기쁘게 뜻을 같이할 때 쓰는 말',
        example: '예) "기꺼이 함께하자! 지금 바로 내려갈게."'
      }
    ]
  }
};

// --- 6-Turn Conversation Scenario ---
const CONVERSATION_TURNS = [
  {
    turn: 1,
    friendName: '민준',
    friendAvatar: '민',
    friendAvatarClass: 'av-1',
    friendMessage: '오늘 급식 메뉴 {{legend_best:레전드}}임ㅋㅋ {{store_snack:매점 간식}} 사러 갈 사람?',
    choices: [
      {
        label: '오늘 급식 완전 레전드네ㅋㅋ 나도 매점 간식 사러 ㄱㄱ!',
        template: '오늘 급식 {{real_totally:완전}} {{legend_best:레전드}}네ㅋㅋ 나도 {{store_snack:매점 간식}} 사러 ㄱㄱ!',
        loanCount: 2,
        sinoCount: 1,
        nativeCount: 0,
        saturationDelta: -18
      },
      {
        label: '진짜 최고다! 안 그래도 매점 간식 먹고 싶었는데 같이 가자',
        template: '{{real_totally:진짜}} {{legend_best:최고}}다! 안 그래도 {{store_snack:매점 간식}} 먹고 싶었는데 같이 가자',
        loanCount: 0,
        sinoCount: 3,
        nativeCount: 0,
        saturationDelta: -15
      },
      {
        label: '오늘 밥차림 참으로 으뜸이네! 나도 주전부리하러 같이 갈래',
        template: '오늘 밥차림 참으로 으뜸이네! 나도 주전부리하러 같이 갈래',
        loanCount: 0,
        sinoCount: 0,
        nativeCount: 3,
        saturationDelta: 0
      }
    ]
  },
  {
    turn: 2,
    friendName: '서연',
    friendAvatar: '서',
    friendAvatarClass: 'av-2',
    friendMessage: '얘들아 근데 국어 모둠 발표 언제였지? 내일이었나? 갑자기 헷갈림;;',
    choices: [
      {
        label: '아 그거 내일 모레로 연기됐어! 다행히 여유 시간 좀 생김ㅋㅋ',
        template: '아 그거 {{day_after_tomorrow:내일 모레}}로 {{postpone_delay:연기됐어}}! 다행히 {{free_time:여유 시간}} 좀 생김ㅋㅋ',
        loanCount: 1,
        sinoCount: 2,
        nativeCount: 0,
        saturationDelta: -16
      },
      {
        label: '선생님이 내일 모레로 미루셨어. 점심 먹고 즉시 자료 찾자!',
        template: '선생님이 {{day_after_tomorrow:내일 모레}}로 미루셨어. 점심 먹고 {{immediately_rightaway:즉시}} 자료 찾자!',
        loanCount: 0,
        sinoCount: 2,
        nativeCount: 1,
        saturationDelta: -14
      },
      {
        label: '그거 글피로 물리셨어! 다행히 숨 돌릴 짬이 좀 생겼네',
        template: '그거 글피로 물리셨어! 다행히 숨 돌릴 짬이 좀 생겼네',
        loanCount: 0,
        sinoCount: 0,
        nativeCount: 3,
        saturationDelta: 0
      }
    ]
  },
  {
    turn: 3,
    friendName: '지호',
    friendAvatar: '지',
    friendAvatarClass: 'av-3',
    friendMessage: '오 다행이다ㅋㅋ 그럼 오늘 방과 후에 떡볶이 먹으러 갈래? 새로 생긴 맛집 찾음!',
    choices: [
      {
        label: '무조건 가야지! 거기 완전 대박이라던데 나한테도 위치 공유해줘',
        template: '{{unconditionally_must:무조건}} 가야지! 거기 {{real_totally:완전}} 대박이라던데 나한테도 위치 {{secret_share:공유해줘}}',
        loanCount: 1,
        sinoCount: 2,
        nativeCount: 0,
        saturationDelta: -15
      },
      {
        label: '당연히 콜이지ㅋㅋ 최근에 생긴 데 맞지? 나한테만 비밀로 알려줘',
        template: '{{unconditionally_must:당연히}} 콜이지ㅋㅋ {{recently_lately:최근에}} 생긴 데 맞지? 나한테만 {{secret_share:비밀로 알려줘}}',
        loanCount: 1,
        sinoCount: 2,
        nativeCount: 0,
        saturationDelta: -14
      },
      {
        label: '기어이 가 봐야지! 요새 소문난 곳 맞지? 나한테도 살짝 귀띔해 줘',
        template: '기어이 가 봐야지! 요새 소문난 곳 맞지? 나한테도 살짝 귀띔해 줘',
        loanCount: 0,
        sinoCount: 0,
        nativeCount: 3,
        saturationDelta: 0
      }
    ]
  },
  {
    turn: 4,
    friendName: '민준',
    friendAvatar: '민',
    friendAvatarClass: 'av-1',
    friendMessage: '근데 다음 주에 수학 단원평가도 있어서 살짝 {{worry_concern:멘붕}}임ㅠㅠ 너네 공부는 함?',
    choices: [
      {
        label: '나도 고민이 엄청 많아ㅠㅠ 오늘부터 진짜 빡공해야 할 듯',
        template: '나도 {{worry_concern:고민}}이 {{very_much:엄청 많아}}ㅠㅠ 오늘부터 {{real_totally:진짜}} 빡공해야 할 듯',
        loanCount: 1,
        sinoCount: 2,
        nativeCount: 0,
        saturationDelta: -14
      },
      {
        label: '솔직히 걱정이 상당히 크네... 다 같이 여유 시간에 풀어보자',
        template: '솔직히 {{worry_concern:걱정}}이 {{very_much:상당히 크네}}... 다 같이 {{free_time:여유 시간}}에 풀어보자',
        loanCount: 0,
        sinoCount: 3,
        nativeCount: 0,
        saturationDelta: -13
      },
      {
        label: '나도 시름이 이만저만이 아니야ㅠㅠ 오늘부터 부지런히 해 보자',
        template: '나도 시름이 이만저만이 아니야ㅠㅠ 오늘부터 부지런히 해 보자',
        loanCount: 0,
        sinoCount: 0,
        nativeCount: 3,
        saturationDelta: 0
      }
    ]
  },
  {
    turn: 5,
    friendName: '서연',
    friendAvatar: '서',
    friendAvatarClass: 'av-2',
    friendMessage: '맞다! 체육대회 반티 투표 올라왔는데 1번 파란색이랑 2번 노란색 중에 뭐가 나아?',
    choices: [
      {
        label: '나는 개인적으로 1번이 레전드 같음! 색깔이 완전 깔끔해',
        template: '나는 {{various_personal:개인적으로}} 1번이 {{legend_best:레전드}} 같음! 색깔이 {{real_totally:완전}} 깔끔해',
        loanCount: 1,
        sinoCount: 2,
        nativeCount: 0,
        saturationDelta: -13
      },
      {
        label: '여러 가지 다 봤는데 1번이 최고야! 우리 반이랑 진짜 잘 어울림',
        template: '{{various_personal:여러 가지}} 다 봤는데 1번이 {{legend_best:최고}}야! 우리 반이랑 {{real_totally:진짜}} 잘 어울림',
        loanCount: 0,
        sinoCount: 3,
        nativeCount: 0,
        saturationDelta: -12
      },
      {
        label: '온갖 옷을 다 봐도 1번이 가장 으뜸이야! 빛깔이 더할 나위 없이 곱네',
        template: '온갖 옷을 다 봐도 1번이 가장 으뜸이야! 빛깔이 더할 나위 없이 곱네',
        loanCount: 0,
        sinoCount: 0,
        nativeCount: 3,
        saturationDelta: 0
      }
    ]
  },
  {
    turn: 6,
    friendName: '지호',
    friendAvatar: '지',
    friendAvatarClass: 'av-3',
    friendMessage: '투표 완료ㅋㅋ 그럼 종 치기 전에 얼른 매점부터 뛰어갔다 오자!',
    choices: [
      {
        label: '오케이! 복도에서 안 걸리게 즉시 출발하자ㅋㅋ 매점 간식 내가 쏜다!',
        template: '{{okay_agree:오케이}}! 복도에서 안 걸리게 {{immediately_rightaway:즉시}} 출발하자ㅋㅋ {{store_snack:매점 간식}} 내가 쏜다!',
        loanCount: 1,
        sinoCount: 2,
        nativeCount: 0,
        saturationDelta: -12
      },
      {
        label: '찬성! 수업 늦지 않게 신속히 다녀오자. 내일 모레 발표도 화이팅!',
        template: '{{okay_agree:찬성}}! 수업 늦지 않게 {{immediately_rightaway:신속히}} 다녀오자. {{day_after_tomorrow:내일 모레}} 발표도 화이팅!',
        loanCount: 1,
        sinoCount: 2,
        nativeCount: 0,
        saturationDelta: -12
      },
      {
        label: '좋아! 선생님 마주치지 않게 단박에 다녀오자. 주전부리는 내가 살게!',
        template: '좋아! 선생님 마주치지 않게 단박에 다녀오자. 주전부리는 내가 살게!',
        loanCount: 0,
        sinoCount: 0,
        nativeCount: 3,
        saturationDelta: 0
      }
    ]
  }
];

// --- Custom Input Keyword Matcher Dictionary ---
const CUSTOM_KEYWORD_RULES = [
  // 1. 비속어 · 욕설 · 거친 표현 (최우선 감지)
  {
    regex: /씨발|시발|시벌|씨벌|샤갈|시부레|씨부레|ㅅㅂ|ㅆㅂ|병신|ㅂㅅ|존나|ㅈㄴ|졸라|미친|ㅁㅊ|지랄|ㅈㄹ|새끼|ㅅㄲ|꺼져|닥쳐|애미|느금마|느금|좆|ㅈ같|썅|염병|젠장|빌어먹을|개같|개빡|빡치네|빡치|빡쳐|빡세|빡센|빡공|개쩐다|개쩔어|개좋|개싫|개웃|개노잼|개꿀|찐따|호구|극혐|뒤지|뒈지|쳐먹|처먹|대가리|주둥이|아가리|엿먹|엿같|멍청이|바보|쓰레기|fuck|shit|bitch|wtf/gi,
    cardId: 'bad_curse',
    type: 'curse'
  },
  // 2. 유행어 · 신조어 · 밈 (야르렁, 야르 등 포함)
  {
    regex: /야르렁|야르|깔끼|폼미쳤다|폼미쳤|오운완|중꺾마|알잘딱깔센|알잘딱|킹받네|킹받|억까|억빠|뇌절|잼민이|가보자고|어쩔티비|저쩔티비|어쩔|크크루삥뽕|스불재|점메추|저메추|갑분싸|TMI|갓생|럭키비키|원영적|마라탕후루|탕후루|사바사|케바케|번달번줌|추구미|느좋|감다살|감다뒤|제곧내|최애|차애|덕질|현타|할많하않|꾸안꾸|복세편살|별다줄|노잼|꿀잼|레게노|무야호|호로록|뿌슝빠슝|머선129/gi,
    cardId: 'meme_slang',
    type: 'meme'
  },
  // 3. 주요 학습 대상 외래어 · 한자어
  { regex: /내일\s*모레|모레/g, cardId: 'day_after_tomorrow', type: 'sino' },
  { regex: /매점\s*간식|간식|매점|군것질/g, cardId: 'store_snack', type: 'sino' },
  { regex: /개인적으로|개인적|여러\s*가지|솔직히|다양한/g, cardId: 'various_personal', type: 'sino' },
  { regex: /레전드|최고|베스트|대박|갓|짱|클라스|클래스/g, cardId: 'legend_best', type: 'loan' },
  { regex: /완전|진짜|레알|진심|리얼|겁나/g, cardId: 'real_totally', type: 'sino' },
  { regex: /연기됐어|연기|미루자|미뤘어|미루셨어|취소/g, cardId: 'postpone_delay', type: 'sino' },
  { regex: /여유\s*시간|빈\s*시간|자유\s*시간|시간|여유/g, cardId: 'free_time', type: 'sino' },
  { regex: /무조건|당연히|당연|필수|절대/g, cardId: 'unconditionally_must', type: 'sino' },
  { regex: /최근에|최근|신상|요즘/g, cardId: 'recently_lately', type: 'sino' },
  { regex: /공유해줘|공유|비밀|알려줘|정보|위치/g, cardId: 'secret_share', type: 'sino' },
  { regex: /고민|걱정|멘붕|스트레스|불안/g, cardId: 'worry_concern', type: 'sino' },
  { regex: /엄청\s*많아|엄청|상당히|너무|많이/g, cardId: 'very_much', type: 'sino' },
  { regex: /즉시|신속히|바로|빨리/g, cardId: 'immediately_rightaway', type: 'sino' },
  { regex: /오케이|오키|찬성|콜|ㄱㄱ|ㅇㅋ|ㅇㅈ|인정|화이팅|파이팅/gi, cardId: 'okay_agree', type: 'loan' },
  // 4. 초성체 · 통신 줄임말 · 로마자 외래 표기
  {
    regex: /ㅇㅇ|ㄴㄴ|ㄷㄷ|ㅂㅂ|ㅅㄱ|ㅎㅇ|ㄱㅅ|ㅈㅅ|[ㅋㅎㅠㅜ]{2,}|[a-zA-Z]{2,}/g,
    cardId: 'chat_abbrev',
    type: 'loan'
  }
];

// 순우리말(고유어) 인정 어휘 목록
const PURE_KOREAN_WHITELIST = [
  '으뜸', '첫손가락', '참으로', '더할 나위 없이', '주전부리', '입가심거리',
  '글피', '사흘', '물리셨어', '물리다', '늦추셨어', '늦추다', '짬', '겨를',
  '기어이', '두말없이', '요새', '접때', '귀띔', '일러', '시름', '애간장',
  '이만저만', '무척', '온갖', '나름대로', '단박에', '곧장', '좋아', '반갑네',
  '얼씨구', '신난다', '더없이', '아찔해라', '쓰이네', '놀랍네', '방긋', '기꺼이',
  '밥차림', '함께', '같이', '갈래', '가자', '먹자', '그러자', '맞아', '그래',
  '고마워', '미안해', '부지런히', '곱네', '멋지네', '빛깔', '솜씨', '마음씨', '나들이'
];

// --- Application State ---
const state = {
  phase: 'intro', // 'intro' | 'chat' | 'receipt' | 'replay' | 'complete'
  currentTurnIdx: 0,
  saturation: 100,
  initialDiagnosisRate: 12,
  loanwordCount: 0,
  sinoCount: 0,
  nativeCount: 0,
  detectedWordsLog: [],
  replaceableInstances: [], // { instanceId, cardId, originalText, restored, chosenWord, element }
  activeInstanceId: null,
  isTyping: false
};

// --- DOM Elements ---
const dom = {
  saturationValue: document.getElementById('saturation-value'),
  saturationBar: document.getElementById('saturation-bar'),
  saturationStatusText: document.getElementById('saturation-status-text'),
  turnCounter: document.getElementById('turn-counter'),
  shadowWordCounter: document.getElementById('shadow-word-counter'),
  nativeWordCounter: document.getElementById('native-word-counter'),
  step1: document.getElementById('step-1'),
  step2: document.getElementById('step-2'),
  step3: document.getElementById('step-3'),
  btnSoundToggle: document.getElementById('btn-sound-toggle'),
  btnRestartSide: document.getElementById('btn-restart-side'),
  btnHeaderReset: document.getElementById('btn-header-reset'),
  roomSubtitle: document.getElementById('room-subtitle'),
  modeBadge: document.getElementById('mode-badge'),
  islandIndicator: document.getElementById('island-indicator'),
  islandStatus: document.getElementById('island-status'),
  replayBanner: document.getElementById('replay-banner'),
  replayProgressText: document.getElementById('replay-progress-text'),
  chatViewport: document.getElementById('chat-viewport'),
  chatMessages: document.getElementById('chat-messages'),
  typingIndicator: document.getElementById('typing-indicator'),
  typingAvatar: document.getElementById('typing-avatar'),
  interactionDock: document.getElementById('interaction-dock'),
  choiceDrawer: document.getElementById('choice-drawer'),
  choiceList: document.getElementById('choice-list'),
  customInputForm: document.getElementById('custom-input-form'),
  customMessageInput: document.getElementById('custom-message-input'),
  btnToggleChoices: document.getElementById('btn-toggle-choices'),
  replayDock: document.getElementById('replay-dock'),
  replayPercentLabel: document.getElementById('replay-percent-label'),
  replayMeterFill: document.getElementById('replay-meter-fill'),
  btnHintNext: document.getElementById('btn-hint-next'),
  btnFinishReplay: document.getElementById('btn-finish-replay'),
  introOverlay: document.getElementById('intro-overlay'),
  btnStartGame: document.getElementById('btn-start-game'),
  receiptOverlay: document.getElementById('receipt-overlay'),
  receiptTimestamp: document.getElementById('receipt-timestamp'),
  receiptSurvivalRate: document.getElementById('receipt-survival-rate'),
  receiptGradeBadge: document.getElementById('receipt-grade-badge'),
  rcTurns: document.getElementById('rc-turns'),
  rcLoanwords: document.getElementById('rc-loanwords'),
  rcSino: document.getElementById('rc-sino'),
  rcNative: document.getElementById('rc-native'),
  rcSaturation: document.getElementById('rc-saturation'),
  receiptWordTags: document.getElementById('receipt-word-tags'),
  receiptComment: document.getElementById('receipt-comment'),
  btnEnterReplay: document.getElementById('btn-enter-replay'),
  wordCardOverlay: document.getElementById('word-card-overlay'),
  cardOriginType: document.getElementById('card-origin-type'),
  btnCloseCard: document.getElementById('btn-close-card'),
  cardBeforeWord: document.getElementById('card-before-word'),
  cardPreviewWord: document.getElementById('card-preview-word'),
  cardContextSentence: document.getElementById('card-context-sentence'),
  nativeCardOptions: document.getElementById('native-card-options'),
  finalOverlay: document.getElementById('final-overlay'),
  finalBeforeRate: document.getElementById('final-before-rate'),
  finalAfterRate: document.getElementById('final-after-rate'),
  finalLearnedList: document.getElementById('final-learned-list'),
  btnReviewChat: document.getElementById('btn-review-chat'),
  btnRestartFinal: document.getElementById('btn-restart-final'),
  particleCanvas: document.getElementById('particle-canvas')
};

// --- Particle System for Color Restoration ---
class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x, y, count = 42) {
    const colors = ['#ec4899', '#8b5cf6', '#38bdf8', '#10b981', '#fbbf24', '#f43f5e'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 3 + Math.random() * 8.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.2,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.014 + Math.random() * 0.012,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        shape: Math.random() > 0.35 ? 'circle' : 'petal'
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.16; // gentle gravity
      p.vx *= 0.985;
      p.alpha -= p.decay;
      p.rotation += p.vRot;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // rounded diamond/petal
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }
    requestAnimationFrame(() => this.animate());
  }
}

const particles = new ParticleEngine(dom.particleCanvas);

// --- Saturation & Visual Environment Controller ---
function updateSaturationVisuals(newSaturation) {
  state.saturation = Math.max(8, Math.min(100, Math.round(newSaturation)));
  const normalizedSat = state.saturation / 100;
  // Map 8%..100% so that 12% looks very grayscale (saturate ~0.06)
  const cssSaturate = state.saturation <= 15
    ? (state.saturation / 100) * 0.45
    : normalizedSat;
  const vignetteOpacity = Math.max(0, (1 - normalizedSat) * 0.85);

  document.documentElement.style.setProperty('--chat-saturation', cssSaturate.toFixed(2));
  document.documentElement.style.setProperty('--shadow-vignette', vignetteOpacity.toFixed(2));

  dom.saturationValue.textContent = `${state.saturation}%`;
  dom.saturationBar.style.width = `${state.saturation}%`;
  dom.roomSubtitle.textContent = `민준, 서연, 지호, 나 · 색채 농도 ${state.saturation}%`;

  // Dynamic Island & Side Status Text
  if (state.saturation >= 80) {
    dom.saturationValue.style.color = '#38bdf8';
    dom.saturationStatusText.textContent = '✨ 대화방에 우리말의 고운 빛깔이 살아 있어요.';
    dom.islandIndicator.style.background = '#10b981';
    dom.islandStatus.textContent = `색채 농도 ${state.saturation}%`;
  } else if (state.saturation >= 45) {
    dom.saturationValue.style.color = '#fbbf24';
    dom.saturationStatusText.textContent = '🌫️ 외래어·한자어가 늘어나며 색채가 조금씩 바래고 있어요.';
    dom.islandIndicator.style.background = '#f59e0b';
    dom.islandStatus.textContent = `채도 감소 중 (${state.saturation}%)`;
  } else {
    dom.saturationValue.style.color = '#f87171';
    dom.saturationStatusText.textContent = '🖤 그림자가 짙어져 대화방이 흑백에 가까워졌어요!';
    dom.islandIndicator.style.background = '#ef4444';
    dom.islandStatus.textContent = `흑백 주의 (${state.saturation}%)`;
  }

  dom.turnCounter.textContent = `${Math.min(state.currentTurnIdx, CONVERSATION_TURNS.length)} / ${CONVERSATION_TURNS.length} 턴`;
  dom.shadowWordCounter.textContent = `${state.loanwordCount + state.sinoCount}개`;
  dom.nativeWordCounter.textContent = `${state.nativeCount}개`;
}

// --- Stepper UI Helper ---
function updatePhaseStepper(phaseNum) {
  [dom.step1, dom.step2, dom.step3].forEach((el, idx) => {
    el.classList.remove('active', 'done');
    if (idx + 1 === phaseNum) el.classList.add('active');
    else if (idx + 1 < phaseNum) el.classList.add('done');
  });
}

// --- Parse Message Template with {{cardId:text}} into DOM Elements ---
function renderTemplateToFragment(templateStr, senderType) {
  const fragment = document.createDocumentFragment();
  const regex = /\{\{([a-z_]+):([^}]+)\}\}/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(templateStr)) !== null) {
    if (match.index > lastIndex) {
      fragment.appendChild(document.createTextNode(templateStr.slice(lastIndex, match.index)));
    }
    const cardId = match[1];
    const surfaceText = match[2];
    const instanceId = `inst_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    const span = document.createElement('span');
    span.className = 'replaceable-token unrestored';
    span.dataset.instanceId = instanceId;
    span.dataset.cardId = cardId;
    span.dataset.originalText = surfaceText;
    span.textContent = surfaceText;

    span.addEventListener('click', (e) => {
      if (state.phase !== 'replay') return;
      e.stopPropagation();
      openWordCardModal(instanceId);
    });

    state.replaceableInstances.push({
      instanceId,
      cardId,
      originalText: surfaceText,
      senderType,
      restored: false,
      chosenWord: null,
      element: span,
      contextRaw: templateStr.replace(/\{\{[a-z_]+:([^}]+)\}\}/g, '$1')
    });

    if (senderType === 'user') {
      state.detectedWordsLog.push(surfaceText);
    }

    fragment.appendChild(span);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < templateStr.length) {
    fragment.appendChild(document.createTextNode(templateStr.slice(lastIndex)));
  }

  return fragment;
}

// --- Append Message Bubble to Chat ---
function appendChatMessage({ senderType, senderName, avatarText, avatarClass, templateStr }) {
  const row = document.createElement('div');
  row.className = `msg-row ${senderType}`;

  const now = new Date();
  const timeStr = `오후 12:${String(30 + state.currentTurnIdx).padStart(2, '0')}`;

  if (senderType === 'friend') {
    const avatar = document.createElement('div');
    avatar.className = `friend-avatar ${avatarClass || 'av-1'}`;
    avatar.textContent = avatarText || '친';
    row.appendChild(avatar);
  }

  const col = document.createElement('div');
  col.className = 'msg-col';

  if (senderType === 'friend' && senderName) {
    const nameEl = document.createElement('span');
    nameEl.className = 'sender-name';
    nameEl.textContent = senderName;
    col.appendChild(nameEl);
  }

  const wrap = document.createElement('div');
  wrap.className = 'msg-bubble-wrap';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.appendChild(renderTemplateToFragment(templateStr, senderType));

  const timeEl = document.createElement('span');
  timeEl.className = 'msg-time';
  timeEl.textContent = timeStr;

  wrap.appendChild(bubble);
  wrap.appendChild(timeEl);
  col.appendChild(wrap);
  row.appendChild(col);

  dom.chatMessages.appendChild(row);
  scrollToBottom();
}

function appendSaturationToast(text, mode = 'normal') {
  const toast = document.createElement('div');
  const extraClass = mode === 'good' ? 'good' : mode === 'curse' ? 'curse' : '';
  toast.className = `system-saturation-notice ${extraClass}`;
  toast.textContent = text;
  dom.chatMessages.appendChild(toast);
  scrollToBottom();
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    dom.chatViewport.scrollTop = dom.chatViewport.scrollHeight;
  });
}

// Helper: only replace regex outside existing {{cardId:text}} tokens
function replaceOutsideTokens(inputStr, regex, replacer) {
  const parts = inputStr.split(/(\{\{[a-z_]+:[^}]+\}\})/g);
  return parts
    .map((part) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        return part;
      }
      return part.replace(regex, replacer);
    })
    .join('');
}

// --- Analyze Direct Custom Input from User ---
function analyzeCustomReply(rawText, turnObj) {
  let processedTemplate = rawText.trim();
  let matchedLoan = 0;
  let matchedSino = 0;
  let matchedCurse = 0;
  let matchedMeme = 0;
  let matchedAny = false;

  // Replace known profanity, memes, loanwords, Sino-Korean words, and chat abbreviations
  CUSTOM_KEYWORD_RULES.forEach((rule) => {
    processedTemplate = replaceOutsideTokens(processedTemplate, rule.regex, (matchedStr) => {
      matchedAny = true;
      if (rule.type === 'curse') {
        matchedCurse++;
        matchedLoan++;
      } else if (rule.type === 'meme') {
        matchedMeme++;
        matchedLoan++;
      } else if (rule.type === 'loan') {
        matchedLoan++;
      } else {
        matchedSino++;
      }
      return `{{${rule.cardId}:${matchedStr}}}`;
    });
  });

  // Check if user genuinely used pure Korean words from the whitelist
  let matchedNative = 0;
  PURE_KOREAN_WHITELIST.forEach((pureWord) => {
    if (rawText.includes(pureWord)) {
      matchedNative++;
    }
  });

  // Fallback: if user typed an unknown buzzword/slang/expression not in the pure Korean whitelist
  if (!matchedAny && matchedNative === 0) {
    const cleaned = processedTemplate.replace(/[?!.~,\s]/g, '');
    if (cleaned.length > 0) {
      processedTemplate = `{{meme_slang:${processedTemplate}}}`;
      matchedLoan += 1;
      matchedMeme += 1;
      matchedAny = true;
    }
  }

  const totalShadow = matchedLoan + matchedSino;
  let saturationDelta = 0;
  if (matchedCurse > 0) {
    saturationDelta = -Math.min(25, matchedCurse * 14 + 8);
  } else if (totalShadow > 0) {
    saturationDelta = -Math.min(18, totalShadow * 7 + 5);
  }

  return {
    template: processedTemplate,
    loanCount: matchedLoan,
    sinoCount: matchedSino,
    nativeCount: matchedNative,
    hasCurse: matchedCurse > 0,
    hasMeme: matchedMeme > 0,
    saturationDelta
  };
}

// --- Run Current Turn ---
function presentCurrentTurn() {
  if (state.currentTurnIdx >= CONVERSATION_TURNS.length) {
    finishChatAndShowReceipt();
    return;
  }

  const turnData = CONVERSATION_TURNS[state.currentTurnIdx];
  state.isTyping = true;
  dom.choiceList.innerHTML = '';
  dom.typingAvatar.textContent = turnData.friendAvatar;
  dom.typingAvatar.className = `friend-avatar ${turnData.friendAvatarClass}`;
  dom.typingIndicator.classList.remove('hidden');
  scrollToBottom();

  setTimeout(() => {
    dom.typingIndicator.classList.add('hidden');
    state.isTyping = false;
    sfx.playPop(460, 0.07);

    appendChatMessage({
      senderType: 'friend',
      senderName: turnData.friendName,
      avatarText: turnData.friendAvatar,
      avatarClass: turnData.friendAvatarClass,
      templateStr: turnData.friendMessage
    });

    renderChoicesForTurn(turnData);
  }, 650);
}

function renderChoicesForTurn(turnData) {
  dom.choiceList.innerHTML = '';
  turnData.choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';
    btn.innerHTML = `
      <span>${choice.label}</span>
      <span class="send-arrow">전송 ↗</span>
    `;
    btn.addEventListener('click', () => {
      if (state.isTyping || state.phase !== 'chat') return;
      handleUserTurnSubmit(choice);
    });
    dom.choiceList.appendChild(btn);
  });
  scrollToBottom();
}

function handleUserTurnSubmit(replyData) {
  if (state.isTyping || state.phase !== 'chat') return;
  state.isTyping = true;

  sfx.playPop(640, 0.08);
  appendChatMessage({
    senderType: 'user',
    templateStr: replyData.template
  });

  state.loanwordCount += replyData.loanCount;
  state.sinoCount += replyData.sinoCount;
  state.nativeCount += replyData.nativeCount;
  state.currentTurnIdx += 1;

  if (replyData.saturationDelta < 0) {
    setTimeout(() => {
      sfx.playShadowDrop();
      updateSaturationVisuals(state.saturation + replyData.saturationDelta);
      if (replyData.hasCurse) {
        appendSaturationToast(
          `🚨 비속어·거친 표현 감지! 대화방의 색채가 급격히 어두워집니다 (-${Math.abs(replyData.saturationDelta)}%)`,
          'curse'
        );
      } else if (replyData.hasMeme) {
        appendSaturationToast(
          `🌀 신조어·유행어 사용으로 대화방 채도가 ${Math.abs(replyData.saturationDelta)}% 감소했습니다`,
          'normal'
        );
      } else {
        appendSaturationToast(
          `🌑 외래어·한자어 사용으로 대화방 채도가 ${Math.abs(replyData.saturationDelta)}% 감소했습니다`,
          'normal'
        );
      }
    }, 240);
  } else {
    setTimeout(() => {
      updateSaturationVisuals(state.saturation);
      appendSaturationToast('🌿 고유어 표현으로 대화방의 고운 빛깔을 지켰어요!', 'good');
    }, 240);
  }

  dom.customMessageInput.value = '';
  dom.choiceList.innerHTML = '';

  setTimeout(() => {
    presentCurrentTurn();
  }, 750);
}

// --- Phase 2: Show Diagnostic Receipt ---
function finishChatAndShowReceipt() {
  state.phase = 'receipt';
  updatePhaseStepper(2);
  sfx.playReceiptPrint();

  // Calculate survival rate (lands on 12% if student used typical choices across all 6 turns)
  const totalUsed = state.loanwordCount + state.sinoCount + state.nativeCount;
  let survivalRate = state.saturation;
  if (state.nativeCount === 0) {
    survivalRate = 12;
    updateSaturationVisuals(12);
  } else {
    survivalRate = Math.max(12, Math.min(100, Math.round((state.nativeCount / Math.max(1, totalUsed)) * 88 + 12)));
    updateSaturationVisuals(survivalRate);
  }
  state.initialDiagnosisRate = survivalRate;

  const now = new Date();
  dom.receiptTimestamp.textContent = `발행일시: 2026.10.30 12:${String(35 + state.currentTurnIdx).padStart(2, '0')}:18`;
  dom.receiptSurvivalRate.textContent = `${survivalRate}%`;
  dom.rcTurns.textContent = `${CONVERSATION_TURNS.length} 턴`;
  dom.rcLoanwords.textContent = `${state.loanwordCount} 회`;
  dom.rcSino.textContent = `${state.sinoCount} 회`;
  dom.rcNative.textContent = `${state.nativeCount} 회`;
  dom.rcSaturation.textContent = `${survivalRate}%`;

  if (survivalRate <= 25) {
    dom.receiptGradeBadge.textContent = '심각한 흑백 그림자 단계';
    dom.receiptComment.textContent =
      '“레전드, 매점 간식, 내일 모레, 완전...” 무심코 쓴 외래어와 한자어가 우리말 고유의 빛깔을 덮어버렸어요. 지금 시간을 되돌려 숨어 있는 고유어를 찾아볼까요?';
  } else if (survivalRate <= 65) {
    dom.receiptGradeBadge.textContent = '회색빛 안개 주의 단계';
    dom.receiptComment.textContent =
      '우리말과 외래어·한자어가 반쯤 섞여 있어요! 아쉬웠던 표현들을 고유어 카드로 바꿔 끼우면 대화방이 100% 총천연색으로 되살아납니다.';
  } else {
    dom.receiptGradeBadge.textContent = '우리말 지킴이 새싹 단계';
    dom.receiptComment.textContent =
      '고유어를 꽤 잘 지켜냈어요! 이제 친구들의 말풍선 속에 남아 있는 외래어·한자어까지 모두 고유어로 바꿔 대화방을 완성해 볼까요?';
  }

  // Populate detected shadow words on receipt
  dom.receiptWordTags.innerHTML = '';
  const allUnrestoredLabels = state.replaceableInstances.map((inst) => inst.originalText);
  const uniqueWords = [...new Set(allUnrestoredLabels)];
  uniqueWords.forEach((word) => {
    const chip = document.createElement('span');
    chip.className = 'receipt-tag';
    chip.textContent = `#${word}`;
    dom.receiptWordTags.appendChild(chip);
  });

  dom.receiptOverlay.classList.add('active');
}

// --- Phase 3: Enter Replay Mode (Time Rewind) ---
function enterReplayMode() {
  state.phase = 'replay';
  updatePhaseStepper(3);
  sfx.playSparkleRestore();

  dom.receiptOverlay.classList.remove('active');
  dom.interactionDock.classList.add('hidden');
  dom.replayDock.classList.remove('hidden');
  dom.replayBanner.classList.remove('hidden');

  dom.modeBadge.textContent = '⏪ 리플레이';
  dom.modeBadge.classList.add('replay');
  dom.chatMessages.classList.add('replay-active');

  updateReplayProgressUI();

  // Scroll to first unrestored word
  scrollToNextUnrestoredWord();
}

function updateReplayProgressUI() {
  const total = state.replaceableInstances.length;
  const restoredCount = state.replaceableInstances.filter((i) => i.restored).length;

  dom.replayProgressText.textContent = `${restoredCount} / ${total} 복구`;

  const currentRate = total === 0
    ? 100
    : Math.round(
        state.initialDiagnosisRate +
          ((100 - state.initialDiagnosisRate) * restoredCount) / total
      );

  updateSaturationVisuals(currentRate);
  dom.replayPercentLabel.textContent = `${currentRate}% / 100%`;
  dom.replayMeterFill.style.width = `${currentRate}%`;

  if (restoredCount >= total && total > 0) {
    dom.btnFinishReplay.classList.remove('hidden');
    dom.btnHintNext.classList.add('hidden');
    setTimeout(() => {
      if (state.phase === 'replay') showFinalCelebrationModal();
    }, 900);
  } else {
    dom.btnFinishReplay.classList.add('hidden');
    dom.btnHintNext.classList.remove('hidden');
  }
}

function scrollToNextUnrestoredWord() {
  const nextInst = state.replaceableInstances.find((i) => !i.restored);
  if (!nextInst || !nextInst.element) return;
  nextInst.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// --- Open Word Replacement Hint Card Sheet ---
function openWordCardModal(instanceId) {
  const inst = state.replaceableInstances.find((i) => i.instanceId === instanceId);
  if (!inst) return;
  const cardData = WORD_CARDS_DB[inst.cardId];
  if (!cardData) return;

  state.activeInstanceId = instanceId;
  sfx.playPop(580, 0.07);

  dom.cardOriginType.textContent = `${cardData.category} → 고유어 다듬기`;
  dom.cardBeforeWord.textContent = inst.originalText;
  dom.cardPreviewWord.textContent = inst.chosenWord || '?';

  const highlightedSentence = inst.contextRaw.replace(
    inst.originalText,
    `<mark>${inst.originalText}</mark>`
  );
  dom.cardContextSentence.innerHTML = `"${highlightedSentence}"`;

  dom.nativeCardOptions.innerHTML = '';
  cardData.cards.forEach((cardOption) => {
    const cardBtn = document.createElement('button');
    cardBtn.type = 'button';
    cardBtn.className = 'native-hint-card';
    cardBtn.innerHTML = `
      <div class="native-card-main">
        <strong>✨ ${cardOption.word}</strong>
        <span class="native-card-pos">${cardOption.pos}</span>
        <span class="native-card-meaning">${cardOption.meaning}<br/><small style="color:#059669">${cardOption.example}</small></span>
      </div>
      <span class="native-card-pick">바꿔 끼우기</span>
    `;

    cardBtn.addEventListener('mouseenter', () => {
      dom.cardPreviewWord.textContent = cardOption.word;
    });

    cardBtn.addEventListener('click', () => {
      applyNativeWordReplacement(instanceId, cardOption.word);
    });

    dom.nativeCardOptions.appendChild(cardBtn);
  });

  dom.wordCardOverlay.classList.add('active');
}

function applyNativeWordReplacement(instanceId, chosenNativeWord) {
  const inst = state.replaceableInstances.find((i) => i.instanceId === instanceId);
  if (!inst) return;

  inst.restored = true;
  inst.chosenWord = chosenNativeWord;

  // Update DOM bubble token
  const el = inst.element;
  el.classList.remove('unrestored');
  el.classList.add('restored');
  el.textContent = chosenNativeWord;

  // Close sheet
  dom.wordCardOverlay.classList.remove('active');

  // Sound + Particle Burst from bubble position
  sfx.playSparkleRestore();
  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  particles.burst(centerX, centerY, 48);

  updateReplayProgressUI();
}

// --- Phase 4: Final Completion Modal ---
function showFinalCelebrationModal() {
  state.phase = 'complete';
  sfx.playSparkleRestore();
  particles.burst(window.innerWidth / 2, window.innerHeight / 2, 75);

  dom.finalBeforeRate.textContent = `${state.initialDiagnosisRate}%`;
  dom.finalAfterRate.textContent = '100%';

  dom.finalLearnedList.innerHTML = '';
  state.replaceableInstances.forEach((inst) => {
    if (!inst.restored) return;
    const item = document.createElement('div');
    item.className = 'learned-item';
    item.innerHTML = `
      <span class="old-w">${inst.originalText}</span>
      <span>➜</span>
      <span class="new-w">✨ ${inst.chosenWord}</span>
    `;
    dom.finalLearnedList.appendChild(item);
  });

  dom.finalOverlay.classList.add('active');
}

// --- Reset & Start Game ---
function resetAndStartGame() {
  state.phase = 'chat';
  state.currentTurnIdx = 0;
  state.saturation = 100;
  state.initialDiagnosisRate = 12;
  state.loanwordCount = 0;
  state.sinoCount = 0;
  state.nativeCount = 0;
  state.detectedWordsLog = [];
  state.replaceableInstances = [];
  state.activeInstanceId = null;
  state.isTyping = false;

  dom.chatMessages.innerHTML = '';
  dom.chatMessages.classList.remove('replay-active');
  dom.introOverlay.classList.remove('active');
  dom.receiptOverlay.classList.remove('active');
  dom.wordCardOverlay.classList.remove('active');
  dom.finalOverlay.classList.remove('active');

  dom.interactionDock.classList.remove('hidden');
  dom.replayDock.classList.add('hidden');
  dom.replayBanner.classList.add('hidden');
  dom.modeBadge.textContent = '일상 대화';
  dom.modeBadge.classList.remove('replay');

  updatePhaseStepper(1);
  updateSaturationVisuals(100);
  presentCurrentTurn();
}

// --- Event Listeners ---
dom.btnStartGame.addEventListener('click', () => {
  sfx.playPop(600, 0.09);
  resetAndStartGame();
});

dom.btnRestartSide.addEventListener('click', () => {
  resetAndStartGame();
});

dom.btnHeaderReset.addEventListener('click', () => {
  resetAndStartGame();
});

dom.btnSoundToggle.addEventListener('click', () => {
  sfx.enabled = !sfx.enabled;
  dom.btnSoundToggle.textContent = sfx.enabled ? '🔊 효과음 ON' : '🔇 효과음 OFF';
});

dom.btnToggleChoices.addEventListener('click', () => {
  dom.choiceDrawer.classList.toggle('collapsed');
});

dom.customInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (state.phase !== 'chat' || state.isTyping) return;
  const val = dom.customMessageInput.value.trim();
  if (!val) return;
  const currentTurn = CONVERSATION_TURNS[state.currentTurnIdx];
  const analyzed = analyzeCustomReply(val, currentTurn);
  handleUserTurnSubmit(analyzed);
});

dom.btnEnterReplay.addEventListener('click', () => {
  enterReplayMode();
});

dom.btnCloseCard.addEventListener('click', () => {
  dom.wordCardOverlay.classList.remove('active');
});

dom.wordCardOverlay.addEventListener('click', (e) => {
  if (e.target === dom.wordCardOverlay) {
    dom.wordCardOverlay.classList.remove('active');
  }
});

dom.btnHintNext.addEventListener('click', () => {
  const nextInst = state.replaceableInstances.find((i) => !i.restored);
  if (nextInst) {
    nextInst.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => openWordCardModal(nextInst.instanceId), 300);
  }
});

dom.btnFinishReplay.addEventListener('click', () => {
  showFinalCelebrationModal();
});

dom.btnReviewChat.addEventListener('click', () => {
  dom.finalOverlay.classList.remove('active');
});

dom.btnRestartFinal.addEventListener('click', () => {
  resetAndStartGame();
});

// Initialize visuals on load
updateSaturationVisuals(100);
