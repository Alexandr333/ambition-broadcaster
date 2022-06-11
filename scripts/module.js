Hooks.once('init', async function() {
  console.log('init')
});

Hooks.once('ready', async function() {
  console.log('ready');
});

updateActorListenerID = Hooks.on('updateActor', (a, b) => {
  let messages=[];
  if(b?.data?.details['personal-ambitions'] && b?.data?.details['personal-ambitions']['short-term'] !== undefined) {
    messages[0] = `Личная краткосрочная амбиция изменена:`;
    messages[1] = messages[1] = `${b?.data?.details['personal-ambitions']['short-term']}`;
  }
  if(b?.data?.details['personal-ambitions'] && b?.data?.details['personal-ambitions']['long-term'] !== undefined) {
    messages[0] = `Личная долгосрочная амбиция изменена:`;
    messages[1] = `${b?.data?.details['personal-ambitions']['long-term']}`;
  }
  if(b?.data?.details['party-ambitions'] && b?.data?.details['personal-ambitions']['short-term'] !== undefined) {
    messages[0] = `Командная краткосрочная амбиция изменена:`;
    messages[1] = `${b?.data?.details['party-ambitions']['short-term']}`;
  }
  if(b?.data?.details['party-ambitions'] && b?.data?.details['personal-ambitions']['long-term'] !== undefined) {
    messages[0] = `Командная долгосрочная амбиция изменена:`;
    messages[1] = `${b?.data?.details['party-ambitions']['long-term']}`;
  }
  
  if(!messages.length) {
    return;
  }
  
  
  let actr = a.name;
  let spkr = ChatMessage.getSpeaker({ actr });
  
  ChatMessage.create({
    speaker: spkr,
    content: `<b>${messages[0]}</b>
              <div style="word-break: break-words;">${messages[1]}</div>` ,
    whisper: ChatMessage.getWhisperRecipients('GM'),
  });
});

Hooks.once('ambitions-broadcaster.close', () => {
  Hooks.off('updateActor', updateActorListenerID);
});
