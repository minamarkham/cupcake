---
date: 2017-12-23
title: 'Refactoring Your Way to a Design System'
summary: 'This is my first post for 24 Ways: on how to refactor code to create a design system.'
canonical:
    url: https://24ways.org/2017/refactoring-your-way-to-a-design-system/
    title: 24 Ways
    domain: https://24ways.org
tags:
    - design systems
    - css
    - refactoring
---

I love refactoring code. Absolutely love it. There’s something about taking a piece of UI or a bit of code and reworking it in a way that is simpler, modular, and reusable that makes me incredibly happy.

I also love design systems work. It gives [hybrids like me](https://24ways.org/2017/design-systems-and-hybrids/) a home. It seems like [everyone](https://www.designbetter.co/design-systems-handbook) [is](https://medium.com/twitter-design-research/looking-to-horizon-why-we-built-a-design-system-841d0a9125be) [talking](http://bradfrost.com/blog/post/design-system-frictions/) about design systems right now. Design systems teams are perfect for those who enjoy doing architectural work and who straddle the line between designer and developer.

Una Kravets recently identified some of the reasons that [design systems fail](https://24ways.org/2017/why-design-systems-fail/), and chief among them are lack of buy-in, underlying architecture, and communication. While it’s definitely easier to establish these before project work begins, that doesn’t mean it is the only path to success.

It’s a privilege to work on a greenfield project, and one that is not afforded to many. Companies with complex and/or legacy codebases may not be able to support a full rewrite of their product. In addition, many people feel overwhelmed at the thought of creating a complete system and are at a loss of how or where to even begin the process.

This is where refactoring comes into play.

According to Martin Fowler, “refactoring is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure.” It’s largely invisible work, and if you do it right, the end user will never know the difference. What it will do is provide a decent foundation to begin more systematic work.

## Build a solid foundation

When I was first asked to create [Pantsuit](https://medium.com/git-out-the-vote/pantsuit-the-hillary-clinton-ui-pattern-library-238e9bf06b54), the design system for Hillary for America, I was tasked with changing our codebase to be more modular and scalable, without changing the behavior or visual design of the UI. We needed a system in place that would allow for the rapid creation of new projects while maintaining a consistent visual language. In essence, I was asked to refactor our code into a design system.

During that refactor, I focused the majority of my efforts on creating a scalable architecture based on the UI components in a single workflow. Since I needed to maintain a 1:1 parity with production, the only changes I _could_ create were under-the-hood. I started with writing coding standards and deciding on a CSS architecture that I would then use as I rewrote sections of the codebase.

If you already have these in place, great! If not, then this is an excellent place to start. Even if your dream of a design system is never fully realized, having a coding philosophy and architecture in place will still have far-reaching benefits and implications.

I want to note that if your refactor includes creating new coding standards or a CSS architecture, don’t try to switch everything over right away. Instead, focus on a single new feature and isolate/encapsulate your work from the rest of the codebase.

## Focus on the features

> The key principle to cleaning up a complex codebase is to always refactor in the service of a feature. - Max Kanat-Alexander

Refactoring for the sake of refactoring can easily lead to accusations of misused time and lack of results. Another danger of refactoring is that it can turn into [yak-shaving](https://www.hanselman.com/blog/YakShavingDefinedIllGetThatDoneAsSoonAsIShaveThisYak.aspx) if you aren’t disciplined in your approach. To that end, tying your refactored components to feature work is a great way to limit scope and reduce the rest of unintended changes.

For example, the initial work on Pantsuit focused only on components related to the donations flow. Every line of code I wrote was in service to improving the maintainability and modularity of that UI. Because we didn’t have any standards in place, I started with those. From there, I identified all the components present in every step of the donations flow, which included some type styles, buttons, form inputs and error states. Then came the refactor of each individual component. Finally, I reintegrated the newly refactored components into the existing donations flow and tested it against production, checking for visual and behavioral diffs. At the end of this process, I had the beginning of a design system that would grow to serve over 50 applications, and a case study to demonstrate its effectiveness.

Ideally, you’ll want to get buy-in from your stakeholders and product owners before you begin any design systems work. However, in the absence of buy-in, linking your work to new feature development is a good way to both limit the scope of your refactor and jump start component creation.

In addition, if you’re still trying to convince your team of the benefits of a design system, starting small and using the newly refactored, feature-driven work as a case study is one way showcase a design systems’ value. By providing a concrete example of how working towards a design system contributed to the project’s success, you’re gathering the data necessary to secure buy-in for a larger-scale effort. It’s a great way to show value, rather than just talking about it.

## Show, don’t tell

Perhaps the most important thing you can do for any design system is to document it. The key is to create a frictionless way to keep the documentation up-to-date, otherwise no one will contribute to it, and in turn, it will become obsolete and useless.

There are lots of tools out there to help you get started documenting your new system. One of my favorites is [KSS](https://github.com/kneath/kss), which parses comments in the code and uses them to generate a style guide. For Pantsuit, I used the node version of KSS, along with a [template](http://htanjo.github.io/kss-node-template/) to quickly spin up a documentation site.

I’ve listed just a few tools below; for even more, check out the tools sections of [styleguides.io](http://styleguides.io/tools).

-   [Fractal](https://fractal.build/)
-   [Pattern Lab](http://patternlab.io)
-   [Drizzle](https://github.com/cloudfour/drizzle)
-   [Fabricator](http://fbrctr.github.io/)
-   [Astrum](http://astrum.nodividestudio.com/)
-   [Catalog](http://www.catalog.style/)

Regardless of what tool you settle on, it needs to integrate well with your current workflow.

## Conclusion: always be refactoring

If you’re not lucky enough to be able to start a new design system from scratch, you can start small and work on a single feature or component. With each new project comes a new opportunity to flesh out a new part of the system, and another potential case study to secure buy-in and showcase its value. Make sure to carefully and thoroughly document each new portion of the system as it’s built. After a few projects, you’ll find yourself with a decent start to a design system.

Good luck, and happy holidays!

### Further reading:

-   [Why Design Systems Fail](https://24ways.org/2017/why-design-systems-fail/)
-   [CSS Architecture for Design Systems](http://bradfrost.com/blog/post/css-architecture-for-design-systems/)
-   [Refactoring: Improving the Design of Existing Code](https://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672)
-   [Refactoring CSS: The Three I’s](https://csswizardry.com/2016/08/refactoring-css-the-three-i-s/)
-   [Refactoring is About Features](https://www.codesimplicity.com/post/refactoring-is-about-features/)
