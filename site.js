/* Ponharish Kumar J — shared behaviour */
(function(){
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- patent data (from published Indian patent applications) ---------- */
  var P = [
    {no:'202641124647', cat:'RF & Sensing', c:'#2f6bff',
     t:'Passive Sensor Tag Having Dual Stochastic Breakdown Branches Sharing a Common Charge Storage Node',
     s:'A battery-free chipless tag whose reading does not depend on how far away the reader is.',
     d:['Passive tags run on harvested RF energy, so their readings drift whenever incident power changes with distance, orientation or surroundings.',
        'This tag has two matched branches drawing charge from one shared storage node. Each holds a stochastic breakdown element that fires at noise-randomised intervals and triggers a backscatter pulse. One branch carries the sensing element, the other a fixed reference. Because both see the same node and the same threshold noise, the ratio of their firing rates cancels incident power and tracks only the measurand.',
        'No clock, no assigned ID code, no battery.'],
     w:'Dr. Hemanta Kumar Sahu, Angad Reddy, Niranjana Sridhar, Richard Prince'},
    {no:'202641124648', cat:'Hardware Security', c:'#7a5cff',
     t:'Method of Certifying an Electronic Component by Cross-Modal Interface Consistency Testing',
     s:'Catches counterfeit and tampered chips by checking whether all their interfaces agree on one physical state.',
     d:['Most chip verification checks each interface on its own, so an attacker only has to imitate each one separately.',
        'Every interface on a die is shaped by the same operating state: temperature, supply voltage, process variation. A probe stimulates the timing-domain and amplitude-domain interfaces, fits a shared operating-state vector with inverse-variance weighting, and computes a cross-modal consistency residual. If it exceeds the bound learned at enrolment, the part fails, even when every interface passes on its own.',
        'It needs no permanent modification to the device.'],
     w:'Dr. Hemanta Kumar Sahu, Angad Reddy, Niranjana Sridhar, Richard Prince'},
    {no:'202641125346', cat:'Instrumentation', c:'#00a37a',
     t:'Apparatus and Method for Optically Qualified Incremental Impedance Measurement of a Compacted Particulate Specimen',
     s:'Pairs optical deformation imaging with impedance sensing to decide whether an electrical reading can be trusted.',
     d:['Measures the electrical response of compacted particulate materials under incremental loading.',
        'Optical deformation imaging is synchronised with complex impedance measurements over several spatially sensitive current patterns. The system spots local particle rearrangements and qualifies each electrical change as physically valid before accepting it.'],
     w:'Dr. Kavitha Sambasivam, Vishnu Priya, Eraiyanbu B'},
    {no:'202641125329', cat:'Sustainability', c:'#00a37a',
     t:'Biochar Provenance Verification System Using Paired Conversion-Yield and Optical-Reflectance Severity Determinations',
     s:'Verifies a biochar batch’s declared feedstock and pyrolysis severity at the point of receipt.',
     d:['Combines two complementary measurements, conversion yield and optical reflectance, to estimate carbonisation severity.',
        'Disagreement between the two flags inconsistent declarations and possible blends, making biochar assessment at the receiving stage more transparent.'],
     w:'Dr. Kavitha Sambasivam, Eraiyanbu B, Vishnu Priya, Deepak R'},
    {no:'202641115862', cat:'Product Design', c:'#ff5a36',
     t:'Deployable Parting-Vane Apparatus for Identification-Driven Presentation of a Selected Item from a Flexible Container',
     s:'A smart bag that parts its contents to present the exact book or file you asked for.',
     d:['Sensors identify each upright item and its position. Choose one by app, voice or schedule, and deployable supports open clearance around it while steadying its neighbours.',
        'During transport the mechanism doubles as a semi-rigid internal frame, and safety sensing stops motion on obstruction or abnormal load.',
        'Concept by Sachin T. Ponharish led the mechanical design and drafted the patent.'],
     w:'Sachin T (ideator)'},
    {no:'202641102292', cat:'Healthcare AI', c:'#e2366b',
     t:'Privacy-Preserving Federated Learning System with Minority Synthesis for Robust Multi-Institutional Clinical Predictions',
     s:'Hospitals train one clinical model together without ever sharing raw patient data.',
     d:['Combines conditional generative models for synthetic minority-class data with differential privacy and secure aggregation.',
        'A minority-aware aggregation step weights each update by effective sample count, minority-class representation and update consistency. It also supports heterogeneous clinical modalities, low-rank adapters for efficient communication, and optional machine unlearning.'],
     w:'Under the guidance of Prof. Kathiravan Srinivasan'},
    {no:'202641076802', cat:'Smart Buildings', c:'#2f6bff',
     t:'Vision-Augmented Multi-Elevator Dispatch System with Predictive AI Control',
     s:'Elevators that see the lobby, predict demand and prioritise accessibility and emergencies.',
     d:['Brings together computer vision, predictive intelligence, smartphone proximity detection, accessibility recognition, emergency detection and federated learning to optimise dispatch while protecting privacy.'],
     w:'Danush P (original concept)'},
    {no:'202641075276', cat:'Food & AI', c:'#ff9f0a',
     t:'Multimodal Vision and Sensor Fusion Smart Cabinet for Automated Fruit Analysis and Personalised Dietary Recommendation',
     s:'A kitchen cabinet that recognises produce, judges ripeness and weight, and suggests what to eat.',
     d:['Deep learning, gas sensing and distributed force sensing identify fruits and vegetables, locate them, assess ripeness, estimate weight and compute nutrition, then turn the result into personalised dietary advice.'],
     w:'Dr. G. M. Karthik (mentor); Krishn Sumit Agarwal, Tharakesharasu Thennarasu, Karunakaram Nitya Ramita, Ark Khandelwal'},
    {no:'202641074228', cat:'Human Sensing', c:'#e2366b',
     t:'Multimodal Stress Detection System Using Instrumented Computer Input Devices',
     s:'KeyStress reads stress from the keyboard and mouse you already use, with no wearables and no cloud.',
     d:['Fuses keystroke dynamics, force sensing, electrodermal activity and IMU data from an instrumented keyboard and pointing device.',
        'It detects stress in real time, identifies its predominant source, computes a composite score and delivers adaptive interventions, all processed on-device.'],
     w:''},
    {no:'202641068131', cat:'Water', c:'#00b3d6',
     t:'Adaptive Water Quality Gating Apparatus with Predictive Membrane Protection',
     s:'A smart gate that stops bad water before it reaches a home RO membrane.',
     d:['Continuously monitors TDS, pH and temperature. Adaptive thresholds and temporal pattern analysis decide whether incoming water is fit to filter and close the flow if not, cutting premature membrane wear, maintenance and downtime.'],
     w:'Dr. Jayakumar K, Richard Prince'},
    {no:'202641058588', cat:'Healthcare AI', c:'#e2366b',
     t:'Distributed Public-Health Surveillance System for Privacy-Preserving Detection of Emerging Clinical Event Patterns',
     s:'Federated early-warning for outbreaks across many hospitals, without moving patient records.',
     d:['Facilities keep data local and contribute encrypted model updates. The system flags abnormal clinical patterns, supports spatio-temporal outbreak detection and generates decision-support outputs for clinicians.'],
     w:''},
    {no:'202641064003', cat:'Energy', c:'#ff9f0a',
     t:'Machine-Learning-Powered IoT-Based Sustainable Home Energy Management System',
     s:'Predicts household demand and schedules appliances around solar, tariffs and comfort.',
     d:['Monitors usage, occupancy, environment, renewable availability and grid parameters. A hybrid edge-cloud architecture forecasts demand, schedules appliances, detects abnormal consumption and minimises cost.'],
     w:''},
    {no:'202641053872', cat:'Water', c:'#00b3d6',
     t:'Automated Hard Water to Soft Water Conversion and Vending System',
     s:'Unattended softening and dispensing with load-cell accuracy and transaction validation.',
     d:['Load-cell measurement, controlled chemical dosing and regulated flow run under microcontroller closed-loop control, with overflow protection and abnormal-condition detection for safe unattended use.'],
     w:'Dr. Malaya Kumar Hota, Dr. Jayakumar K'},
    {no:'202641059404', cat:'RF & Sensing', c:'#2f6bff',
     t:'Portable Wind Field Measurement System with Bird Drift Prediction',
     s:'A triangular sensor array that maps local 2-D wind vectors and predicts how birds will drift.',
     d:['Multiple wind sensing elements in a triangular arrangement give wind magnitude, direction and spatial variation, with applications in aviation safety, wildlife monitoring and environmental studies.'],
     w:'Dr. T. Poornima, Richard Prince'}
  ];
  window.__P = P;

  function card(p,i){
    return '<button class="pc" data-i="'+i+'" data-cat="'+p.cat+'" style="--c:'+p.c+'" data-r data-d="'+(i%3)+'">'+
      '<span class="tag">'+p.cat+'</span><h3>'+p.t+'</h3><p>'+p.s+'</p>'+
      '<span class="no"><span>IN '+p.no+'</span><span class="plus">+</span></span></button>';
  }

  document.addEventListener('DOMContentLoaded', function(){
    var root = document.documentElement;

    /* render patents where asked */
    var rail = document.getElementById('rail');
    if (rail) rail.innerHTML = P.slice(0,8).map(card).join('');
    var grid = document.getElementById('pgrid');
    if (grid) grid.innerHTML = P.map(card).join('');

    /* field breakdown bars */
    var bars = document.getElementById('bars');
    if (bars){
      var cnt = {}, col = {};
      P.forEach(function(p){ cnt[p.cat]=(cnt[p.cat]||0)+1; col[p.cat]=p.c; });
      var ks = Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a]});
      var mx = cnt[ks[0]];
      bars.innerHTML = ks.map(function(k,i){ return '<div class="bar" style="--c:'+col[k]+';--w:'+(cnt[k]/mx*100)+'%;--d:'+i+'"><span>'+k+'</span><span class="track"><span class="fill"></span></span><b>'+cnt[k]+'</b></div>'; }).join('');
    }

    /* filter chips */
    var chips = document.getElementById('chips');
    if (chips && grid){
      var cats = ['All'].concat(P.map(function(p){return p.cat}).filter(function(v,i,a){return a.indexOf(v)===i}));
      chips.innerHTML = cats.map(function(c,i){return '<button class="chip'+(i?'':' on')+'">'+c+'</button>'}).join('');
      chips.addEventListener('click', function(e){
        var b = e.target.closest('.chip'); if(!b) return;
        chips.querySelectorAll('.chip').forEach(function(x){x.classList.toggle('on', x===b)});
        var c = b.textContent;
        grid.querySelectorAll('.pc').forEach(function(el){
          var show = c==='All' || el.dataset.cat===c;
          el.classList.toggle('out', !show);
          if (show){ el.classList.remove('in'); requestAnimationFrame(function(){ el.classList.add('in') }); }
        });
      });
    }

    /* sheet */
    var sheet = document.getElementById('sheet');
    document.addEventListener('click', function(e){
      var pc = e.target.closest('.pc');
      if (pc && sheet){
        var p = P[+pc.dataset.i];
        sheet.querySelector('.body').innerHTML =
          '<span class="eyebrow" style="color:'+p.c+'">'+p.cat+'</span><h2>'+p.t+'</h2>'+
          p.d.map(function(x){return '<p>'+x+'</p>'}).join('')+
          '<dl class="meta"><div><dt>Application No.</dt><dd>'+p.no+'</dd></div><div><dt>Status</dt><dd>Published, Indian Patent Office, 2026</dd></div>'+
          (p.w?'<div style="grid-column:1/-1"><dt>With</dt><dd>'+p.w+'</dd></div>':'')+'</dl>';
        sheet.classList.add('open'); root.style.overflow='hidden'; if(window.__lenis) __lenis.stop();
      } else if (pc && !sheet){ location.href = 'patents.html'; }
      if (e.target.closest('[data-close]')){ sheet.classList.remove('open'); root.style.overflow=''; if(window.__lenis) __lenis.start(); }
    });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape' && sheet && sheet.classList.contains('open')){ sheet.querySelector('[data-close]').click(); } });

    /* rail buttons */
    document.querySelectorAll('[data-rail]').forEach(function(b){
      b.addEventListener('click', function(){ var r=document.getElementById('rail'); r.scrollBy({left:(+b.dataset.rail)*380, behavior:'smooth'}); });
    });

    /* nav: active tab, hide on scroll, burger */
    var nav = document.querySelector('.nav');
    var here = (location.pathname.split('/').pop() || 'index.html');
    nav.querySelectorAll('.tabs a').forEach(function(a){ if (a.getAttribute('href')===here) a.classList.add('on'); });
    nav.querySelector('.burger').addEventListener('click', function(){ nav.classList.toggle('open'); });
    var lastY = 0;

    /* smooth scroll */
    if (!reduce && window.Lenis){
      try{
        var lenis = new Lenis({lerp:.09, smoothWheel:true});
        window.__lenis = lenis;
        (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(0);
      }catch(e){}
    }

    /* reveals */
    var io = new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ en.target.style.setProperty('--d', en.target.dataset.d||0); en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    document.querySelectorAll('.bars').forEach(function(b){ io.observe(b) });
    function watch(){ document.querySelectorAll('[data-r]:not(.in)').forEach(function(el){ io.observe(el) }); }
    watch();

    /* counters */
    var cio = new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(!en.isIntersecting) return; cio.unobserve(en.target);
        var el=en.target, to=+el.dataset.count, t0=null, dur=1400;
        if (reduce){ el.firstChild.nodeValue = to; return; }
        (function step(t){ if(!t0) t0=t; var k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,4); el.firstChild.nodeValue = Math.round(to*e); if(k<1) requestAnimationFrame(step); })(performance.now());
      });
    },{threshold:.6});
    document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el) });

    /* scroll-linked effects */
    var pin = document.querySelector('.pin'), media = pin && pin.querySelector('.pin-media'), cap = pin && pin.querySelector('.pin-cap');
    var pars = [].slice.call(document.querySelectorAll('.split-media img'));
    var words = document.querySelector('.words'), wl = words ? [].slice.call(words.querySelectorAll('.w')) : [];
    function onScroll(){
      var y = window.scrollY, vh = innerHeight;
      if (y > lastY + 6 && y > 300 && !nav.classList.contains('open')) nav.classList.add('hide');
      else if (y < lastY - 6) nav.classList.remove('hide');
      lastY = y;
      if (media && !reduce){
        var r = pin.getBoundingClientRect(), k = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
        var e = 1 - Math.pow(1-Math.min(1,k*1.6),3);
        var sx = (innerWidth / media.offsetWidth), sy = (vh / media.offsetHeight);
        var s = 1 + (Math.max(sx,sy) - 1) * e;
        media.style.transform = 'scale('+s.toFixed(4)+')';
        media.style.borderRadius = (40*(1-e)).toFixed(1)+'px';
        cap.classList.toggle('show', k > .55);
      }
      if (!reduce) pars.forEach(function(img){
        var b = img.parentNode.getBoundingClientRect(); if (b.bottom < 0 || b.top > vh) return;
        var p = (b.top + b.height/2 - vh/2) / vh; img.style.transform = 'scale(1.12) translateY('+(p*-6).toFixed(2)+'%)';
      });
      if (wl.length){
        var wr = words.getBoundingClientRect(), wk = Math.min(.999, Math.max(0, -wr.top / (wr.height - vh)));
        var idx = Math.floor(wk * wl.length);
        wl.forEach(function(w,i){ w.classList.toggle('on', i<=idx && wr.top < vh*.2) });
      }
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    requestAnimationFrame(function(){ setTimeout(function(){ root.classList.add('loaded') }, 60) });
    document.getElementById('yr') && (document.getElementById('yr').textContent = new Date().getFullYear());
  });
})();
