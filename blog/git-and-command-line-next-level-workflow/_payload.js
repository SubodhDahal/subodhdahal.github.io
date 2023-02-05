export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az,aA,aB,aC,aD,aE){return {data:{"/blog/git-and-command-line-next-level-workflow":{_path:"\u002Fblog\u002Fgit-and-command-line-next-level-workflow",_dir:"blog",_draft:J,_partial:J,_locale:"en",_empty:J,title:"Git and the command-line: Take Your Workflow to the Next Level",description:"Some tips on how to improve your Git productivity using the command-line",image:"\u002Fimages\u002Fgit-and-command-line\u002Fprogrammer.png",alt:"Supercharge your Git-workflow",postDate:"2022-12-18T00:00:00.000Z",tags:["programming"],body:{type:"root",children:[{type:b,tag:H,props:{id:"what-is-git"},children:[{type:a,value:"What is Git?"}]},{type:b,tag:i,props:{},children:[{type:a,value:"Git is a version control system that helps developers track changes to their code and collaborate with others on software projects. It allows developers to easily switch between different versions of their code and work on different features in parallel without affecting the main codebase."}]},{type:b,tag:H,props:{id:"why-use-the-command-line"},children:[{type:a,value:"Why use the command-line?"}]},{type:b,tag:i,props:{},children:[{type:a,value:"Although there are many GUI Git applications, using git from the command-line allows you to configure and streamline it to your workflow rather than being constrained by the interfaces of the GUI. It will also force you to understand more of how git works and since it's a tool that developers need to use often, I'd say it's not a bad motivation. You can still use the GUI for taking care of the more complex tasks until you get more familiar with using the command-line."}]},{type:b,tag:H,props:{id:"tips-to-improve-your-workflow"},children:[{type:a,value:"Tips to improve your workflow"}]},{type:b,tag:F,props:{id:W},children:[{type:a,value:X}]},{type:b,tag:i,props:{},children:[{type:a,value:"When using git from the command-line you are expected to write commands but this doesn't mean you can't make life easier for yourself. Instead of writing the whole command all the time, you can add shorter versions of them as aliases."}]},{type:b,tag:i,props:{},children:[{type:a,value:"Here are some of the aliases that I use frequently:"}]},{type:b,tag:"div",props:{className:["flex",Y]},children:[{type:a,value:o},{type:b,tag:"table",props:{className:["table-auto",Y,"mb-4","w-1\u002F2"]},children:[{type:a,value:I},{type:b,tag:"thead",props:{},children:[{type:a,value:k},{type:b,tag:t,props:{},children:[{type:a,value:l},{type:b,tag:Z,props:{},children:[{type:a,value:s}]},{type:a,value:l},{type:b,tag:Z,props:{},children:[{type:a,value:"command"}]},{type:a,value:k}]},{type:a,value:I}]},{type:a,value:I},{type:b,tag:"tbody",props:{className:["font-mono"]},children:[{type:a,value:k},{type:b,tag:t,props:{},children:[{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"g"}]},{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:u}]},{type:a,value:k}]},{type:a,value:k},{type:b,tag:t,props:{},children:[{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"ga"}]},{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"git add"}]},{type:a,value:k}]},{type:a,value:k},{type:b,tag:t,props:{},children:[{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"gb"}]},{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"git branch"}]},{type:a,value:k}]},{type:a,value:k},{type:b,tag:t,props:{},children:[{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:_}]},{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"git commit -v"}]},{type:a,value:k}]},{type:a,value:k},{type:b,tag:t,props:{},children:[{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"gco"}]},{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"git checkout"}]},{type:a,value:k}]},{type:a,value:k},{type:b,tag:t,props:{},children:[{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"gcb"}]},{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"git checkout -b"}]},{type:a,value:k}]},{type:a,value:k},{type:b,tag:t,props:{},children:[{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"gcp"}]},{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"git cherry-pick"}]},{type:a,value:k}]},{type:a,value:k},{type:b,tag:t,props:{},children:[{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"grb"}]},{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"git rebase"}]},{type:a,value:k}]},{type:a,value:k},{type:b,tag:t,props:{},children:[{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"grbi"}]},{type:a,value:l},{type:b,tag:m,props:{},children:[{type:a,value:"git rebase -i"}]},{type:a,value:k}]},{type:a,value:I}]},{type:a,value:o}]}]},{type:b,tag:i,props:{},children:[{type:a,value:"So now the following"}]},{type:b,tag:q,props:{code:"git commit -v -m 'my commit message'\n",language:y,meta:B},children:[{type:b,tag:C,props:{},children:[{type:b,tag:q,props:{__ignoreMap:z},children:[{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:p},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"commit"}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:$}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:aa}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:ab}]}]}]}]}]},{type:b,tag:i,props:{},children:[{type:a,value:"becomes"}]},{type:b,tag:q,props:{code:"gc -m 'my commit message'\n",language:y,meta:B},children:[{type:b,tag:C,props:{},children:[{type:b,tag:q,props:{__ignoreMap:z},children:[{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:p},children:[{type:a,value:_}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:aa}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:ab}]}]}]}]}]},{type:b,tag:i,props:{},children:[{type:a,value:"If you have "},{type:b,tag:n,props:{},children:[{type:a,value:"zsh"}]},{type:a,value:" as your shell, have "},{type:b,tag:n,props:{},children:[{type:a,value:ac}]},{type:a,value:" installed and the "},{type:b,tag:n,props:{},children:[{type:a,value:u}]},{type:a,value:" plugin enabled, there are already a lot of git aliases configured and can use them. You can have a look at them "},{type:b,tag:v,props:{href:"https:\u002F\u002Fgithub.com\u002Fohmyzsh\u002Fohmyzsh\u002Fblob\u002Fmaster\u002Fplugins\u002Fgit\u002Fgit.plugin.zsh",rel:[D]},children:[{type:a,value:"here"}]},{type:a,value:". Even if you don't use "},{type:b,tag:n,props:{},children:[{type:a,value:ac}]},{type:a,value:", you can take inspiration from the aliases and set them for your shell."}]},{type:b,tag:i,props:{},children:[{type:a,value:"For the "},{type:b,tag:n,props:{},children:[{type:a,value:y}]},{type:a,value:" shell, you can add the following to your "},{type:b,tag:n,props:{},children:[{type:a,value:ad}]},{type:a,value:" file."}]},{type:b,tag:q,props:{code:"alias g='git'\nalias ga='git add'\nalias gb='git branch'\nalias gc='git commit -v'\nalias gco='git checkout'\nalias gcb='git checkout -b'\nalias gcp='git cherry-pick'\nalias grb='git rebase'\nalias grbi='git rebase -i'\n",language:y,meta:B},children:[{type:b,tag:C,props:{},children:[{type:b,tag:q,props:{__ignoreMap:z},children:[{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:s}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" g"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"'git'"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:s}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" ga"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"'git add'"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:s}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" gb"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"'git branch'"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:s}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" gc"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"'git commit -v'"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:s}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ae}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"'git checkout'"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:s}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" gcb"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"'git checkout -b'"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:s}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" gcp"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"'git cherry-pick'"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:s}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" grb"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"'git rebase'"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:s}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" grbi"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"'git rebase -i'"}]}]}]}]}]},{type:b,tag:F,props:{id:af},children:[{type:a,value:ag}]},{type:b,tag:i,props:{},children:[{type:a,value:"We are human after all and sometimes we make spelling mistakes. Instead of having to correct the command ourself, we can let git do it for us if the mistakes are minimal."}]},{type:b,tag:i,props:{},children:[{type:a,value:"We can enable git auto-correct for all git repos by using the following command:"}]},{type:b,tag:q,props:{code:"git config --global help.autoCorrect 5\n",language:y,meta:B},children:[{type:b,tag:C,props:{},children:[{type:b,tag:q,props:{__ignoreMap:z},children:[{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:p},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"config"}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:ah}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:ai}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"5"}]}]}]}]}]},{type:b,tag:i,props:{},children:[{type:a,value:"The value of "},{type:b,tag:n,props:{},children:[{type:a,value:ai}]},{type:a,value:" is the number of deciseconds git waits before it auto-corrects and applies the command. In the command above, it will wait 0.5 seconds."}]},{type:b,tag:i,props:{},children:[{type:a,value:"The "},{type:b,tag:n,props:{},children:[{type:a,value:ah}]},{type:a,value:" flag specifies that auto-correction will be enabled for all git repositories in the system. If you omit this, it will only take effect in the current repo."}]},{type:b,tag:K,props:{className:[L]},children:[{type:a,value:o},{type:b,tag:M,props:{src:"\u002Fimages\u002Fgit-and-command-line\u002Fgit-autocorrect.png",alt:"git auto-correct in action"},children:[]},{type:a,value:o},{type:b,tag:N,props:{},children:[{type:a,value:"Git auto-correct in action"}]}]},{type:b,tag:F,props:{id:aj},children:[{type:a,value:ak}]},{type:b,tag:i,props:{},children:[{type:a,value:"When you are working on a project you will need to switch between different branches. You can use "},{type:b,tag:n,props:{},children:[{type:a,value:"git checkout \u003Cbranch_name\u003E"}]},{type:a,value:al},{type:b,tag:n,props:{},children:[{type:a,value:"git switch \u003Cbranch_name\u003E"}]},{type:a,value:" to do that. But the "},{type:b,tag:n,props:{},children:[{type:a,value:"\u003Cbranch_name\u003E"}]},{type:a,value:" needs to be exact and if you don't remember it you will need to run further commands or look up the branch name somewhere."}]},{type:b,tag:i,props:{},children:[{type:a,value:"We can make switching git branches simpler by integrating the checkout process with "},{type:b,tag:v,props:{href:"https:\u002F\u002Fgithub.com\u002Fjunegunn\u002Ffzf",rel:[D]},children:[{type:a,value:am}]},{type:a,value:". fzf is a command-line fuzzy finder which means we don't need to precisely remember the branch name. Just typing a few characters will list us the branches that match the existing branches using fuzzy logic."}]},{type:b,tag:i,props:{},children:[{type:a,value:"You can add the following to your "},{type:b,tag:n,props:{},children:[{type:a,value:ad}]},{type:a,value:al},{type:b,tag:n,props:{},children:[{type:a,value:".zshrc"}]},{type:a,value:" file to configure a custom function "},{type:b,tag:n,props:{},children:[{type:a,value:O}]},{type:a,value:" to run fzf with the list of branches in the repo, which you can then search fuzzily."}]},{type:b,tag:q,props:{code:"# Slightly modified version of the script mentioned in https:\u002F\u002Frevelry.co\u002Finsights\u002Fdevelopment\u002Fterminal-workflow-fzf\u002F\ngit_checkout_branch() {\n  if [[ $1 != \"\" ]]; then\n    # pass all the parameters as-is, if provided\n    git checkout $*\n    return\n  fi\n\n  LINES=2\n  # show branches\n  result=$(git branch -a --color=always | grep -v '\u002FHEAD\\s' | sort |\n    fzf --height 50% --border --ansi --tac --preview-window right:70% \\\n      --preview 'git log --oneline --graph --date=short --pretty=\"format:%C(auto)%cd %h%d %s\" $(sed s\u002F^..\u002F\u002F \u003C\u003C\u003C {} | cut -d\" \" -f1) | head -'$LINES |\n    sed 's\u002F^..\u002F\u002F' | cut -d' ' -f1)\n\n  if [[ $result != \"\" ]]; then\n    if [[ $result == remotes\u002F* ]]; then\n      git checkout --track $(echo $result | sed 's#remotes\u002F##')\n    else\n      git checkout \"$result\"\n    fi\n  fi\n}\n",language:y,meta:B},children:[{type:b,tag:C,props:{},children:[{type:b,tag:q,props:{__ignoreMap:z},children:[{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:P},children:[{type:a,value:"# Slightly modified version of the script mentioned in https:\u002F\u002Frevelry.co\u002Finsights\u002Fdevelopment\u002Fterminal-workflow-fzf\u002F"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:"ct-c4d91f"},children:[{type:a,value:O}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:"() {"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:G}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:Q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" [[ "}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:"$1"}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:an}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:ao}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:R}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:S}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:w}]},{type:b,tag:c,props:{class:P},children:[{type:a,value:"# pass all the parameters as-is, if provided"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:w}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:T}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"$*"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:w}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:"return"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:G}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:U}]}]},{type:b,tag:c,props:{class:g},children:[]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:"  LINES"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"2"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:G}]},{type:b,tag:c,props:{class:P},children:[{type:a,value:"# show branches"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:"  result"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:ap}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:" branch "}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"-a"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"--color=always"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:E}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:"grep"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:$}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:" '\u002FHEAD\\s' "}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:E}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:"sort"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:E}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:w}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:am}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"--height"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"50"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:aq}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"--border"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"--ansi"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"--tac"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"--preview-window"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:" right:"}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"70"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:aq}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"\\"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:V}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"--preview"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:" 'git log --oneline --graph --date=short --pretty=\"format:%C(auto)%cd %h%d %s\" $(sed s\u002F^..\u002F\u002F \u003C\u003C\u003C {} | cut -d\" \" -f1) | head -'"}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:"$LINES"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:E}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:e},children:[{type:a,value:w}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:ar}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:" 's\u002F^..\u002F\u002F' "}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:E}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:"cut"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"-d"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"' ' "}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"-f1"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:")"}]}]},{type:b,tag:c,props:{class:g},children:[]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:G}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:Q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:as}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:an}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:ao}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:R}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:S}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:w}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:Q}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:as}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:"=="}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:" remotes\u002F"}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:"*"}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:R}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:S}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:V}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:T}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"--track"}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:ap}]},{type:b,tag:c,props:{class:j},children:[{type:a,value:"echo"}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:at}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:E}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:ar}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:" 's#remotes\u002F##')"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:w}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:"else"}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:V}]},{type:b,tag:c,props:{class:p},children:[{type:a,value:u}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:T}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:h}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:au}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:at}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:au}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:w}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:U}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:G}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:U}]}]},{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:d},children:[{type:a,value:"}"}]}]}]}]}]},{type:b,tag:i,props:{},children:[{type:b,tag:"strong",props:{},children:[{type:a,value:"Source:"}]},{type:a,value:" Modified version of "},{type:b,tag:v,props:{href:av,rel:[D]},children:[{type:a,value:av}]}]},{type:b,tag:i,props:{},children:[{type:a,value:"Then when you run the command "},{type:b,tag:n,props:{},children:[{type:a,value:O}]},{type:a,value:" in the terminal, you will be presented with the branches in the repo and can type part of the branch name to get the branch name you want. Pressing enter on the selected branch will switch the current branch to that branch."}]},{type:b,tag:i,props:{},children:[{type:a,value:"You can, of course, add this as an alias instead of having to type the whole command."}]},{type:b,tag:q,props:{code:"alias gco='git_checkout_branch'\n",language:y,meta:B},children:[{type:b,tag:C,props:{},children:[{type:b,tag:q,props:{__ignoreMap:z},children:[{type:b,tag:c,props:{class:g},children:[{type:b,tag:c,props:{class:f},children:[{type:a,value:s}]},{type:b,tag:c,props:{class:d},children:[{type:a,value:ae}]},{type:b,tag:c,props:{class:f},children:[{type:a,value:r}]},{type:b,tag:c,props:{class:e},children:[{type:a,value:"'git_checkout_branch'"}]}]}]}]}]},{type:b,tag:i,props:{},children:[{type:a,value:"If you already know the branch name and don't want to be presented with a list of options, you can just use the command as "},{type:b,tag:n,props:{},children:[{type:a,value:"gco \u003Cbranch_name\u003E"}]},{type:a,value:", eg: "},{type:b,tag:n,props:{},children:[{type:a,value:"gco develop"}]},{type:a,value:aw}]},{type:b,tag:K,props:{className:[L]},children:[{type:a,value:o},{type:b,tag:M,props:{src:"\u002Fimages\u002Fgit-and-command-line\u002Fgit-checkout-fzf.gif",alt:ax},children:[]},{type:a,value:o},{type:b,tag:N,props:{},children:[{type:a,value:"Git checkout with fzf in action"}]}]},{type:b,tag:F,props:{id:ay},children:[{type:a,value:az}]},{type:b,tag:i,props:{},children:[{type:a,value:"Although rebase and interactive rebase can seem like a scary concepts in the beginning, after you get used to it, they can be powerful tools to organize history in a Git repo. It can be useful in a variety of situations, including:"}]},{type:b,tag:aA,props:{className:[aB]},children:[{type:a,value:o},{type:b,tag:x,props:{},children:[{type:a,value:"Combining multiple commits into one"}]},{type:a,value:o},{type:b,tag:x,props:{},children:[{type:a,value:"Splitting a single commit into multiple commits"}]},{type:a,value:o},{type:b,tag:x,props:{},children:[{type:a,value:"Reordering commits"}]},{type:a,value:o},{type:b,tag:x,props:{},children:[{type:a,value:"Removing commits"}]},{type:a,value:o},{type:b,tag:x,props:{},children:[{type:a,value:"Fixing mistakes in commits"}]},{type:a,value:o},{type:b,tag:x,props:{},children:[{type:a,value:"Updating your local repository to match the upstream repository"}]}]},{type:b,tag:i,props:{},children:[{type:a,value:"You can learn more about rebasing in "},{type:b,tag:v,props:{href:aC,rel:[D]},children:[{type:a,value:aC}]},{type:a,value:aw}]},{type:b,tag:i,props:{},children:[{type:b,tag:v,props:{href:"https:\u002F\u002Fgithub.com\u002FMitMaro\u002Fgit-interactive-rebase-tool",rel:[D]},children:[{type:a,value:"Git Interactive Rebase Tool"}]},{type:a,value:" can help make the process of interactive rebasing easier. It is a GUI tool that runs in the terminal and can be used to rebase commits in a git repo. It is written in Rust and is available for Linux, macOS and Windows."}]},{type:b,tag:K,props:{className:[L],style:"background: #272733"},children:[{type:a,value:o},{type:b,tag:M,props:{src:"\u002Fimages\u002Fgit-and-command-line\u002Finteractive-rebase-tool.gif",alt:ax},children:[]},{type:a,value:o},{type:b,tag:N,props:{},children:[{type:a,value:"Basic usage of Interactive Rebase Tool"}]}]},{type:b,tag:i,props:{},children:[{type:a,value:"You can view the "},{type:b,tag:v,props:{href:"https:\u002F\u002Fmitmaro.github.io\u002Fgit-interactive-rebase-tool\u002F",rel:[D]},children:[{type:a,value:"documentation"}]},{type:a,value:" for more information on how to set up and use the tool, along with all its features."}]},{type:b,tag:H,props:{id:"conclusion"},children:[{type:a,value:"Conclusion"}]},{type:b,tag:i,props:{},children:[{type:a,value:"Trying one or more of the above tips can help you become more productive with git. But as with any new workflow, it takes time to get used to it. So it might be good to start with one or two of the aforementioned tips and then move on to trying the others."}]},{type:b,tag:"hr",props:{},children:[]},{type:b,tag:F,props:{id:aD},children:[{type:a,value:aE}]},{type:b,tag:i,props:{},children:[{type:a,value:"If you would prefer a more GUI approach to working with git but in the terminal, then you can try one of the followings:"}]},{type:b,tag:aA,props:{className:[aB]},children:[{type:a,value:o},{type:b,tag:x,props:{},children:[{type:b,tag:v,props:{href:"https:\u002F\u002Fgithub.com\u002Fjonas\u002Ftig"},children:[{type:a,value:"tig"}]}]},{type:a,value:o},{type:b,tag:x,props:{},children:[{type:b,tag:v,props:{href:"https:\u002F\u002Fgithub.com\u002Fjesseduffield\u002Flazygit"},children:[{type:a,value:"lazygit"}]}]}]},{type:b,tag:"style",children:[{type:a,value:".ct-c4d91f{color:#D2A8FF}\n.ct-e1ed3c{color:#8B949E}\n.ct-c8ef71{color:#FF7B72}\n.ct-6cbbec{color:#79C0FF}\n.ct-07b4a7{color:#A5D6FF}\n.ct-3055f8{color:#C9D1D9}\n.ct-9321cc{color:#FFA657}"}]}],toc:{title:z,searchDepth:A,depth:A,links:[{id:W,depth:A,text:X},{id:af,depth:A,text:ag},{id:aj,depth:A,text:ak},{id:ay,depth:A,text:az},{id:aD,depth:A,text:aE}]}},_type:"markdown",_id:"content:blog:git-and-command-line-next-level-workflow.md",_source:"content",_file:"blog\u002Fgit-and-command-line-next-level-workflow.md",_extension:"md"},"prev-next":[{_path:"\u002Fblog\u002F2022-in-review",title:"Looking back: My 2022 in review"},{_path:"\u002Fblog\u002Fhiking-tsho-rolpa-lake-trail-in-nepal",title:"Hiking Tsho-Rolpa lake trail in Nepal"}]},prerenderedAt:1675631599017}}("text","element","span","ct-3055f8","ct-07b4a7","ct-c8ef71","line"," ","p","ct-6cbbec","\n      ","\n        ","td","code-inline","\n  ","ct-9321cc","code","=","alias","tr","git","a","    ","li","bash","",2,null,"pre","nofollow","|","h2","  ","h1","\n    ",false,"figure","image","img","figcaption","git_checkout_branch","ct-e1ed3c","if"," ]]; ","then","checkout","fi","      ","1-add-aliases-for-commonly-used-commands","1. Add aliases for commonly used commands","justify-center","th","gc","-v","-m","'my commit message'","ohmyzsh",".bashrc"," gco","2-enable-auto-correction-of-spelling-mistakes-for-commands","2. Enable auto-correction of spelling mistakes for commands","--global","help.autoCorrect","3-improved-git-checkout-with-fzf","3. Improved git checkout with fzf"," or ","fzf","!="," \"\"","$(","% ","sed"," [[ $result ","$result","\"","https:\u002F\u002Frevelry.co\u002Finsights\u002Fdevelopment\u002Fterminal-workflow-fzf\u002F",".","fzf in action","4-using-git-interactive-rebase-tool","4. Using Git Interactive Rebase Tool","ul","list","https:\u002F\u002Fgit-rebase.io\u002F","bonus","Bonus:"))