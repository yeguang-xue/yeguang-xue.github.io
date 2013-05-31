---
layout: post
title: Weak Formulations
---

{{ page.title }}
================

NOT FINISHED

During my study in CFD classes last term, I met the concept of _weak_ solution of partial differential equations. At that time I got much confused of its intertion while didn't spend time to study it carefully. Recently I met this concept again when I am reading a book on Finite Element Method. In fact the _weak_ solution is also a fundenmental concept in FEM. As we see, the nature of computational fluid dynamics and computational solid mechanics is to solve systems of partial differential equations (PDE). Although the PDEs of solid mechanics and fluid dynamics have different mathematical properties and thus we choose different numerical approaches like finite volume method or finite element method, still they share many similarities, especially some fundamental ideas. Here we take a in-depth look at the concept of _weak_ solution.

##Derivations

<p>

In solid mechanics and fluid mechanics, we have the systems of PDE in the form of

<div class="equation"> 
\begin{equation}
\textbf{A}(\textbf{u}) =0 \text{ (in } \Omega \text{, the volume)} 
\end{equation}
</div>

where **A** denotes the differential operator. And the boundary conditions is needed, stated as

<div class="equation"> 
\begin{equation}
\textbf{B}(\textbf{u}) =0 \text{ (on } \Gamma \text{, the boundary)}
\end{equation}
</div>

As Eq(1) is established everywhere in the defined volume, we should have

<div class="equation"> 
\begin{equation}
\int_\Omega \textbf{v}^T \textbf{A}(\textbf{u}) \mathrm{d}\Omega = 0
\end{equation}
</div>

<div class="equation">
\begin{equation}
\int_\Gamma \bar{\textbf{v}}^T \textbf{B}(\textbf{u}) \mathrm{d}\Gamma = 0
\end{equation}
</div>

where \( \textbf{v} \) and \( \bar{\textbf{v}} \) are arbitrary function vectors. 




<div class="equation">
\begin{equation}
\int_\Omega \textbf{v}^T \textbf{A}(\textbf{u}) \mathrm{d}\Omega + \int_\Gamma \bar{\textbf{v}}^T \textbf{B}(\textbf{u}) \mathrm{d}\Gamma = 0 
\end{equation}
</div>

integration by parts

<div class="equation">
\begin{equation}
\int_\Omega \textbf{C}^T(\textbf{v}) \textbf{A}(\textbf{u}) \mathrm{d}\Omega + \int_\Gamma \textbf{D}^T(\bar{\textbf{v}}) \textbf{B}(\textbf{u}) \mathrm{d}\Gamma = 0 
\end{equation}
</div>

</p>

##Comments

physically meaningful


##References

<p> [1] 王勖成.  有限单元法.  北京 : 清华大学出版社, 2003 (Chinese)</p>
