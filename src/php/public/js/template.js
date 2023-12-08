function RickDOM() {
    var e, t;
    return Object.defineProperty(this, "allowings", {
        get: function() {
            return void 0 === e ? RickDOM.prototype.allowings : e
        },
        set: function(n) {
            e = JSON.parse(JSON.stringify(n));
            var i, r, a, o, s;
            t = {};
            for (i in e) {
                t[i] = {};
                for (r in e[i])
                    if (a = e[i][r],
                    "style" === r && "object" == typeof a) {
                        t[i][r] = {};
                        for (o in a)
                            s = a[o],
                            "object" == typeof s && void 0 !== s.pattern && (t[i][r][o] = new RegExp(s.pattern,s.flag))
                    } else
                        t[i][r] = "object" == typeof a && void 0 !== a.pattern ? new RegExp(a.pattern,a.flag) : a
            }
        }
    }),
    Object.defineProperty(this, "compiledAllowings", {
        get: function() {
            return void 0 === t && (this.allowings = this.allowings),
            t
        }
    }),
    this
}
if (function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = !!e && "length"in e && e.length
          , n = ht.type(e);
        return "function" === n || ht.isWindow(e) ? !1 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }
    function i(e, t, n) {
        if (ht.isFunction(t))
            return ht.grep(e, function(e, i) {
                return !!t.call(e, i, e) !== n
            });
        if (t.nodeType)
            return ht.grep(e, function(e) {
                return e === t !== n
            });
        if ("string" == typeof t) {
            if (kt.test(t))
                return ht.filter(t, e, n);
            t = ht.filter(t, e)
        }
        return ht.grep(e, function(e) {
            return ht.inArray(e, t) > -1 !== n
        })
    }
    function r(e, t) {
        do
            e = e[t];
        while (e && 1 !== e.nodeType);
        return e
    }
    function a(e) {
        var t = {};
        return ht.each(e.match($t) || [], function(e, n) {
            t[n] = !0
        }),
        t
    }
    function o() {
        it.addEventListener ? (it.removeEventListener("DOMContentLoaded", s),
        e.removeEventListener("load", s)) : (it.detachEvent("onreadystatechange", s),
        e.detachEvent("onload", s))
    }
    function s() {
        (it.addEventListener || "load" === e.event.type || "complete" === it.readyState) && (o(),
        ht.ready())
    }
    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var i = "data-" + t.replace(It, "-$1").toLowerCase();
            if (n = e.getAttribute(i),
            "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : jt.test(n) ? ht.parseJSON(n) : n
                } catch (r) {}
                ht.data(e, t, n)
            } else
                n = void 0
        }
        return n
    }
    function c(e) {
        var t;
        for (t in e)
            if (("data" !== t || !ht.isEmptyObject(e[t])) && "toJSON" !== t)
                return !1;
        return !0
    }
    function u(e, t, n, i) {
        if (Mt(e)) {
            var r, a, o = ht.expando, s = e.nodeType, l = s ? ht.cache : e, c = s ? e[o] : e[o] && o;
            if (c && l[c] && (i || l[c].data) || void 0 !== n || "string" != typeof t)
                return c || (c = s ? e[o] = nt.pop() || ht.guid++ : o),
                l[c] || (l[c] = s ? {} : {
                    toJSON: ht.noop
                }),
                ("object" == typeof t || "function" == typeof t) && (i ? l[c] = ht.extend(l[c], t) : l[c].data = ht.extend(l[c].data, t)),
                a = l[c],
                i || (a.data || (a.data = {}),
                a = a.data),
                void 0 !== n && (a[ht.camelCase(t)] = n),
                "string" == typeof t ? (r = a[t],
                null == r && (r = a[ht.camelCase(t)])) : r = a,
                r
        }
    }
    function d(e, t, n) {
        if (Mt(e)) {
            var i, r, a = e.nodeType, o = a ? ht.cache : e, s = a ? e[ht.expando] : ht.expando;
            if (o[s]) {
                if (t && (i = n ? o[s] : o[s].data)) {
                    ht.isArray(t) ? t = t.concat(ht.map(t, ht.camelCase)) : t in i ? t = [t] : (t = ht.camelCase(t),
                    t = t in i ? [t] : t.split(" ")),
                    r = t.length;
                    for (; r--; )
                        delete i[t[r]];
                    if (n ? !c(i) : !ht.isEmptyObject(i))
                        return
                }
                (n || (delete o[s].data,
                c(o[s]))) && (a ? ht.cleanData([e], !0) : dt.deleteExpando || o != o.window ? delete o[s] : o[s] = void 0)
            }
        }
    }
    function p(e, t, n, i) {
        var r, a = 1, o = 20, s = i ? function() {
            return i.cur()
        }
        : function() {
            return ht.css(e, t, "")
        }
        , l = s(), c = n && n[3] || (ht.cssNumber[t] ? "" : "px"), u = (ht.cssNumber[t] || "px" !== c && +l) && zt.exec(ht.css(e, t));
        if (u && u[3] !== c) {
            c = c || u[3],
            n = n || [],
            u = +l || 1;
            do
                a = a || ".5",
                u /= a,
                ht.style(e, t, u + c);
            while (a !== (a = s() / l) && 1 !== a && --o)
        }
        return n && (u = +u || +l || 0,
        r = n[1] ? u + (n[1] + 1) * n[2] : +n[2],
        i && (i.unit = c,
        i.start = u,
        i.end = r)),
        r
    }
    function h(e) {
        var t = Pt.split("|")
          , n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length; )
                n.createElement(t.pop());
        return n
    }
    function f(e, t) {
        var n, i, r = 0, a = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
        if (!a)
            for (a = [],
            n = e.childNodes || e; null != (i = n[r]); r++)
                !t || ht.nodeName(i, t) ? a.push(i) : ht.merge(a, f(i, t));
        return void 0 === t || t && ht.nodeName(e, t) ? ht.merge([e], a) : a
    }
    function g(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++)
            ht._data(n, "globalEval", !t || ht._data(t[i], "globalEval"))
    }
    function m(e) {
        Ft.test(e.type) && (e.defaultChecked = e.checked)
    }
    function b(e, t, n, i, r) {
        for (var a, o, s, l, c, u, d, p = e.length, b = h(t), v = [], y = 0; p > y; y++)
            if (o = e[y],
            o || 0 === o)
                if ("object" === ht.type(o))
                    ht.merge(v, o.nodeType ? [o] : o);
                else if (Kt.test(o)) {
                    for (l = l || b.appendChild(t.createElement("div")),
                    c = (Bt.exec(o) || ["", ""])[1].toLowerCase(),
                    d = Wt[c] || Wt._default,
                    l.innerHTML = d[1] + ht.htmlPrefilter(o) + d[2],
                    a = d[0]; a--; )
                        l = l.lastChild;
                    if (!dt.leadingWhitespace && Ht.test(o) && v.push(t.createTextNode(Ht.exec(o)[0])),
                    !dt.tbody)
                        for (o = "table" !== c || Vt.test(o) ? "<table>" !== d[1] || Vt.test(o) ? 0 : l : l.firstChild,
                        a = o && o.childNodes.length; a--; )
                            ht.nodeName(u = o.childNodes[a], "tbody") && !u.childNodes.length && o.removeChild(u);
                    for (ht.merge(v, l.childNodes),
                    l.textContent = ""; l.firstChild; )
                        l.removeChild(l.firstChild);
                    l = b.lastChild
                } else
                    v.push(t.createTextNode(o));
        for (l && b.removeChild(l),
        dt.appendChecked || ht.grep(f(v, "input"), m),
        y = 0; o = v[y++]; )
            if (i && ht.inArray(o, i) > -1)
                r && r.push(o);
            else if (s = ht.contains(o.ownerDocument, o),
            l = f(b.appendChild(o), "script"),
            s && g(l),
            n)
                for (a = 0; o = l[a++]; )
                    Ut.test(o.type || "") && n.push(o);
        return l = null,
        b
    }
    function v() {
        return !0
    }
    function y() {
        return !1
    }
    function _() {
        try {
            return it.activeElement
        } catch (e) {}
    }
    function w(e, t, n, i, r, a) {
        var o, s;
        if ("object" == typeof t) {
            "string" != typeof n && (i = i || n,
            n = void 0);
            for (s in t)
                w(e, s, n, i, t[s], a);
            return e
        }
        if (null == i && null == r ? (r = n,
        i = n = void 0) : null == r && ("string" == typeof n ? (r = i,
        i = void 0) : (r = i,
        i = n,
        n = void 0)),
        r === !1)
            r = y;
        else if (!r)
            return e;
        return 1 === a && (o = r,
        r = function(e) {
            return ht().off(e),
            o.apply(this, arguments)
        }
        ,
        r.guid = o.guid || (o.guid = ht.guid++)),
        e.each(function() {
            ht.event.add(this, t, r, i, n)
        })
    }
    function x(e, t) {
        return ht.nodeName(e, "table") && ht.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function k(e) {
        return e.type = (null !== ht.find.attr(e, "type")) + "/" + e.type,
        e
    }
    function C(e) {
        var t = an.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
        e
    }
    function T(e, t) {
        if (1 === t.nodeType && ht.hasData(e)) {
            var n, i, r, a = ht._data(e), o = ht._data(t, a), s = a.events;
            if (s) {
                delete o.handle,
                o.events = {};
                for (n in s)
                    for (i = 0,
                    r = s[n].length; r > i; i++)
                        ht.event.add(t, n, s[n][i])
            }
            o.data && (o.data = ht.extend({}, o.data))
        }
    }
    function N(e, t) {
        var n, i, r;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(),
            !dt.noCloneEvent && t[ht.expando]) {
                r = ht._data(t);
                for (i in r.events)
                    ht.removeEvent(t, i, r.handle);
                t.removeAttribute(ht.expando)
            }
            "script" === n && t.text !== e.text ? (k(t).text = e.text,
            C(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
            dt.html5Clone && e.innerHTML && !ht.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ft.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
            t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }
    function E(e, t, n, i) {
        t = at.apply([], t);
        var r, a, o, s, l, c, u = 0, d = e.length, p = d - 1, h = t[0], g = ht.isFunction(h);
        if (g || d > 1 && "string" == typeof h && !dt.checkClone && rn.test(h))
            return e.each(function(r) {
                var a = e.eq(r);
                g && (t[0] = h.call(this, r, a.html())),
                E(a, t, n, i)
            });
        if (d && (c = b(t, e[0].ownerDocument, !1, e, i),
        r = c.firstChild,
        1 === c.childNodes.length && (c = r),
        r || i)) {
            for (s = ht.map(f(c, "script"), k),
            o = s.length; d > u; u++)
                a = c,
                u !== p && (a = ht.clone(a, !0, !0),
                o && ht.merge(s, f(a, "script"))),
                n.call(e[u], a, u);
            if (o)
                for (l = s[s.length - 1].ownerDocument,
                ht.map(s, C),
                u = 0; o > u; u++)
                    a = s[u],
                    Ut.test(a.type || "") && !ht._data(a, "globalEval") && ht.contains(l, a) && (a.src ? ht._evalUrl && ht._evalUrl(a.src) : ht.globalEval((a.text || a.textContent || a.innerHTML || "").replace(on, "")));
            c = r = null
        }
        return e
    }
    function D(e, t, n) {
        for (var i, r = t ? ht.filter(t, e) : e, a = 0; null != (i = r[a]); a++)
            n || 1 !== i.nodeType || ht.cleanData(f(i)),
            i.parentNode && (n && ht.contains(i.ownerDocument, i) && g(f(i, "script")),
            i.parentNode.removeChild(i));
        return e
    }
    function $(e, t) {
        var n = ht(t.createElement(e)).appendTo(t.body)
          , i = ht.css(n[0], "display");
        return n.detach(),
        i
    }
    function S(e) {
        var t = it
          , n = un[e];
        return n || (n = $(e, t),
        "none" !== n && n || (cn = (cn || ht("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),
        t = (cn[0].contentWindow || cn[0].contentDocument).document,
        t.write(),
        t.close(),
        n = $(e, t),
        cn.detach()),
        un[e] = n),
        n
    }
    function A(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }
    function M(e) {
        if (e in Tn)
            return e;
        for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = Cn.length; n--; )
            if (e = Cn[n] + t,
            e in Tn)
                return e
    }
    function j(e, t) {
        for (var n, i, r, a = [], o = 0, s = e.length; s > o; o++)
            i = e[o],
            i.style && (a[o] = ht._data(i, "olddisplay"),
            n = i.style.display,
            t ? (a[o] || "none" !== n || (i.style.display = ""),
            "" === i.style.display && Ot(i) && (a[o] = ht._data(i, "olddisplay", S(i.nodeName)))) : (r = Ot(i),
            (n && "none" !== n || !r) && ht._data(i, "olddisplay", r ? n : ht.css(i, "display"))));
        for (o = 0; s > o; o++)
            i = e[o],
            i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? a[o] || "" : "none"));
        return e
    }
    function I(e, t, n) {
        var i = wn.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }
    function L(e, t, n, i, r) {
        for (var a = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > a; a += 2)
            "margin" === n && (o += ht.css(e, n + Rt[a], !0, r)),
            i ? ("content" === n && (o -= ht.css(e, "padding" + Rt[a], !0, r)),
            "margin" !== n && (o -= ht.css(e, "border" + Rt[a] + "Width", !0, r))) : (o += ht.css(e, "padding" + Rt[a], !0, r),
            "padding" !== n && (o += ht.css(e, "border" + Rt[a] + "Width", !0, r)));
        return o
    }
    function z(e, t, n) {
        var i = !0
          , r = "width" === t ? e.offsetWidth : e.offsetHeight
          , a = gn(e)
          , o = dt.boxSizing && "border-box" === ht.css(e, "boxSizing", !1, a);
        if (0 >= r || null == r) {
            if (r = mn(e, t, a),
            (0 > r || null == r) && (r = e.style[t]),
            pn.test(r))
                return r;
            i = o && (dt.boxSizingReliable() || r === e.style[t]),
            r = parseFloat(r) || 0
        }
        return r + L(e, t, n || (o ? "border" : "content"), i, a) + "px"
    }
    function R(e, t, n, i, r) {
        return new R.prototype.init(e,t,n,i,r)
    }
    function O() {
        return e.setTimeout(function() {
            Nn = void 0
        }),
        Nn = ht.now()
    }
    function q(e, t) {
        var n, i = {
            height: e
        }, r = 0;
        for (t = t ? 1 : 0; 4 > r; r += 2 - t)
            n = Rt[r],
            i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function F(e, t, n) {
        for (var i, r = (H.tweeners[t] || []).concat(H.tweeners["*"]), a = 0, o = r.length; o > a; a++)
            if (i = r[a].call(n, t, e))
                return i
    }
    function B(e, t, n) {
        var i, r, a, o, s, l, c, u, d = this, p = {}, h = e.style, f = e.nodeType && Ot(e), g = ht._data(e, "fxshow");
        n.queue || (s = ht._queueHooks(e, "fx"),
        null == s.unqueued && (s.unqueued = 0,
        l = s.empty.fire,
        s.empty.fire = function() {
            s.unqueued || l()
        }
        ),
        s.unqueued++,
        d.always(function() {
            d.always(function() {
                s.unqueued--,
                ht.queue(e, "fx").length || s.empty.fire()
            })
        })),
        1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
        c = ht.css(e, "display"),
        u = "none" === c ? ht._data(e, "olddisplay") || S(e.nodeName) : c,
        "inline" === u && "none" === ht.css(e, "float") && (dt.inlineBlockNeedsLayout && "inline" !== S(e.nodeName) ? h.zoom = 1 : h.display = "inline-block")),
        n.overflow && (h.overflow = "hidden",
        dt.shrinkWrapBlocks() || d.always(function() {
            h.overflow = n.overflow[0],
            h.overflowX = n.overflow[1],
            h.overflowY = n.overflow[2]
        }));
        for (i in t)
            if (r = t[i],
            Dn.exec(r)) {
                if (delete t[i],
                a = a || "toggle" === r,
                r === (f ? "hide" : "show")) {
                    if ("show" !== r || !g || void 0 === g[i])
                        continue;
                    f = !0
                }
                p[i] = g && g[i] || ht.style(e, i)
            } else
                c = void 0;
        if (ht.isEmptyObject(p))
            "inline" === ("none" === c ? S(e.nodeName) : c) && (h.display = c);
        else {
            g ? "hidden"in g && (f = g.hidden) : g = ht._data(e, "fxshow", {}),
            a && (g.hidden = !f),
            f ? ht(e).show() : d.done(function() {
                ht(e).hide()
            }),
            d.done(function() {
                var t;
                ht._removeData(e, "fxshow");
                for (t in p)
                    ht.style(e, t, p[t])
            });
            for (i in p)
                o = F(f ? g[i] : 0, i, d),
                i in g || (g[i] = o.start,
                f && (o.end = o.start,
                o.start = "width" === i || "height" === i ? 1 : 0))
        }
    }
    function U(e, t) {
        var n, i, r, a, o;
        for (n in e)
            if (i = ht.camelCase(n),
            r = t[i],
            a = e[n],
            ht.isArray(a) && (r = a[1],
            a = e[n] = a[0]),
            n !== i && (e[i] = a,
            delete e[n]),
            o = ht.cssHooks[i],
            o && "expand"in o) {
                a = o.expand(a),
                delete e[i];
                for (n in a)
                    n in e || (e[n] = a[n],
                    t[n] = r)
            } else
                t[i] = r
    }
    function H(e, t, n) {
        var i, r, a = 0, o = H.prefilters.length, s = ht.Deferred().always(function() {
            delete l.elem
        }), l = function() {
            if (r)
                return !1;
            for (var t = Nn || O(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, a = 1 - i, o = 0, l = c.tweens.length; l > o; o++)
                c.tweens[o].run(a);
            return s.notifyWith(e, [c, a, n]),
            1 > a && l ? n : (s.resolveWith(e, [c]),
            !1)
        }, c = s.promise({
            elem: e,
            props: ht.extend({}, t),
            opts: ht.extend(!0, {
                specialEasing: {},
                easing: ht.easing._default
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: Nn || O(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var i = ht.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                return c.tweens.push(i),
                i
            },
            stop: function(t) {
                var n = 0
                  , i = t ? c.tweens.length : 0;
                if (r)
                    return this;
                for (r = !0; i > n; n++)
                    c.tweens[n].run(1);
                return t ? (s.notifyWith(e, [c, 1, 0]),
                s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]),
                this
            }
        }), u = c.props;
        for (U(u, c.opts.specialEasing); o > a; a++)
            if (i = H.prefilters[a].call(c, e, u, c.opts))
                return ht.isFunction(i.stop) && (ht._queueHooks(c.elem, c.opts.queue).stop = ht.proxy(i.stop, i)),
                i;
        return ht.map(u, F, c),
        ht.isFunction(c.opts.start) && c.opts.start.call(e, c),
        ht.fx.timer(ht.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })),
        c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }
    function P(e) {
        return ht.attr(e, "class") || ""
    }
    function W(e) {
        return function(t, n) {
            "string" != typeof t && (n = t,
            t = "*");
            var i, r = 0, a = t.toLowerCase().match($t) || [];
            if (ht.isFunction(n))
                for (; i = a[r++]; )
                    "+" === i.charAt(0) ? (i = i.slice(1) || "*",
                    (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }
    function K(e, t, n, i) {
        function r(s) {
            var l;
            return a[s] = !0,
            ht.each(e[s] || [], function(e, s) {
                var c = s(t, n, i);
                return "string" != typeof c || o || a[c] ? o ? !(l = c) : void 0 : (t.dataTypes.unshift(c),
                r(c),
                !1)
            }),
            l
        }
        var a = {}
          , o = e === Jn;
        return r(t.dataTypes[0]) || !a["*"] && r("*")
    }
    function V(e, t) {
        var n, i, r = ht.ajaxSettings.flatOptions || {};
        for (i in t)
            void 0 !== t[i] && ((r[i] ? e : n || (n = {}))[i] = t[i]);
        return n && ht.extend(!0, e, n),
        e
    }
    function Y(e, t, n) {
        for (var i, r, a, o, s = e.contents, l = e.dataTypes; "*" === l[0]; )
            l.shift(),
            void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (o in s)
                if (s[o] && s[o].test(r)) {
                    l.unshift(o);
                    break
                }
        if (l[0]in n)
            a = l[0];
        else {
            for (o in n) {
                if (!l[0] || e.converters[o + " " + l[0]]) {
                    a = o;
                    break
                }
                i || (i = o)
            }
            a = a || i
        }
        return a ? (a !== l[0] && l.unshift(a),
        n[a]) : void 0
    }
    function Z(e, t, n, i) {
        var r, a, o, s, l, c = {}, u = e.dataTypes.slice();
        if (u[1])
            for (o in e.converters)
                c[o.toLowerCase()] = e.converters[o];
        for (a = u.shift(); a; )
            if (e.responseFields[a] && (n[e.responseFields[a]] = t),
            !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
            l = a,
            a = u.shift())
                if ("*" === a)
                    a = l;
                else if ("*" !== l && l !== a) {
                    if (o = c[l + " " + a] || c["* " + a],
                    !o)
                        for (r in c)
                            if (s = r.split(" "),
                            s[1] === a && (o = c[l + " " + s[0]] || c["* " + s[0]])) {
                                o === !0 ? o = c[r] : c[r] !== !0 && (a = s[0],
                                u.unshift(s[1]));
                                break
                            }
                    if (o !== !0)
                        if (o && e["throws"])
                            t = o(t);
                        else
                            try {
                                t = o(t)
                            } catch (d) {
                                return {
                                    state: "parsererror",
                                    error: o ? d : "No conversion from " + l + " to " + a
                                }
                            }
                }
        return {
            state: "success",
            data: t
        }
    }
    function Q(e) {
        return e.style && e.style.display || ht.css(e, "display")
    }
    function X(e) {
        if (!ht.contains(e.ownerDocument || it, e))
            return !0;
        for (; e && 1 === e.nodeType; ) {
            if ("none" === Q(e) || "hidden" === e.type)
                return !0;
            e = e.parentNode
        }
        return !1
    }
    function G(e, t, n, i) {
        var r;
        if (ht.isArray(t))
            ht.each(t, function(t, r) {
                n || ri.test(e) ? i(e, r) : G(e + "[" + ("object" == typeof r && null != r ? t : "") + "]", r, n, i)
            });
        else if (n || "object" !== ht.type(t))
            i(e, t);
        else
            for (r in t)
                G(e + "[" + r + "]", t[r], n, i)
    }
    function J() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }
    function et() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }
    function tt(e) {
        return ht.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var nt = []
      , it = e.document
      , rt = nt.slice
      , at = nt.concat
      , ot = nt.push
      , st = nt.indexOf
      , lt = {}
      , ct = lt.toString
      , ut = lt.hasOwnProperty
      , dt = {}
      , pt = "1.12.4"
      , ht = function(e, t) {
        return new ht.fn.init(e,t)
    }
      , ft = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , gt = /^-ms-/
      , mt = /-([\da-z])/gi
      , bt = function(e, t) {
        return t.toUpperCase()
    };
    ht.fn = ht.prototype = {
        jquery: pt,
        constructor: ht,
        selector: "",
        length: 0,
        toArray: function() {
            return rt.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : rt.call(this)
        },
        pushStack: function(e) {
            var t = ht.merge(this.constructor(), e);
            return t.prevObject = this,
            t.context = this.context,
            t
        },
        each: function(e) {
            return ht.each(this, e)
        },
        map: function(e) {
            return this.pushStack(ht.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(rt.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ot,
        sort: nt.sort,
        splice: nt.splice
    },
    ht.extend = ht.fn.extend = function() {
        var e, t, n, i, r, a, o = arguments[0] || {}, s = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof o && (c = o,
        o = arguments[s] || {},
        s++),
        "object" == typeof o || ht.isFunction(o) || (o = {}),
        s === l && (o = this,
        s--); l > s; s++)
            if (null != (r = arguments[s]))
                for (i in r)
                    e = o[i],
                    n = r[i],
                    o !== n && (c && n && (ht.isPlainObject(n) || (t = ht.isArray(n))) ? (t ? (t = !1,
                    a = e && ht.isArray(e) ? e : []) : a = e && ht.isPlainObject(e) ? e : {},
                    o[i] = ht.extend(c, a, n)) : void 0 !== n && (o[i] = n));
        return o
    }
    ,
    ht.extend({
        expando: "jQuery" + (pt + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === ht.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === ht.type(e)
        }
        ,
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !ht.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== ht.type(e) || e.nodeType || ht.isWindow(e))
                return !1;
            try {
                if (e.constructor && !ut.call(e, "constructor") && !ut.call(e.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (n) {
                return !1
            }
            if (!dt.ownFirst)
                for (t in e)
                    return ut.call(e, t);
            for (t in e)
                ;
            return void 0 === t || ut.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? lt[ct.call(e)] || "object" : typeof e
        },
        globalEval: function(t) {
            t && ht.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            }
            )(t)
        },
        camelCase: function(e) {
            return e.replace(gt, "ms-").replace(mt, bt)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var i, r = 0;
            if (n(e))
                for (i = e.length; i > r && t.call(e[r], r, e[r]) !== !1; r++)
                    ;
            else
                for (r in e)
                    if (t.call(e[r], r, e[r]) === !1)
                        break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(ft, "")
        },
        makeArray: function(e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? ht.merge(i, "string" == typeof e ? [e] : e) : ot.call(i, e)),
            i
        },
        inArray: function(e, t, n) {
            var i;
            if (t) {
                if (st)
                    return st.call(t, e, n);
                for (i = t.length,
                n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                    if (n in t && t[n] === e)
                        return n
            }
            return -1
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, r = e.length; n > i; )
                e[r++] = t[i++];
            if (n !== n)
                for (; void 0 !== t[i]; )
                    e[r++] = t[i++];
            return e.length = r,
            e
        },
        grep: function(e, t, n) {
            for (var i, r = [], a = 0, o = e.length, s = !n; o > a; a++)
                i = !t(e[a], a),
                i !== s && r.push(e[a]);
            return r
        },
        map: function(e, t, i) {
            var r, a, o = 0, s = [];
            if (n(e))
                for (r = e.length; r > o; o++)
                    a = t(e[o], o, i),
                    null != a && s.push(a);
            else
                for (o in e)
                    a = t(e[o], o, i),
                    null != a && s.push(a);
            return at.apply([], s)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, r;
            return "string" == typeof t && (r = e[t],
            t = e,
            e = r),
            ht.isFunction(e) ? (n = rt.call(arguments, 2),
            i = function() {
                return e.apply(t || this, n.concat(rt.call(arguments)))
            }
            ,
            i.guid = e.guid = e.guid || ht.guid++,
            i) : void 0
        },
        now: function() {
            return +new Date
        },
        support: dt
    }),
    "function" == typeof Symbol && (ht.fn[Symbol.iterator] = nt[Symbol.iterator]),
    ht.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        lt["[object " + t + "]"] = t.toLowerCase()
    });
    var vt = function(e) {
        function t(e, t, n, i) {
            var r, a, o, s, l, c, d, h, f = t && t.ownerDocument, g = t ? t.nodeType : 9;
            if (n = n || [],
            "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g)
                return n;
            if (!i && ((t ? t.ownerDocument || t : F) !== M && A(t),
            t = t || M,
            I)) {
                if (11 !== g && (c = bt.exec(e)))
                    if (r = c[1]) {
                        if (9 === g) {
                            if (!(o = t.getElementById(r)))
                                return n;
                            if (o.id === r)
                                return n.push(o),
                                n
                        } else if (f && (o = f.getElementById(r)) && O(t, o) && o.id === r)
                            return n.push(o),
                            n
                    } else {
                        if (c[2])
                            return G.apply(n, t.getElementsByTagName(e)),
                            n;
                        if ((r = c[3]) && w.getElementsByClassName && t.getElementsByClassName)
                            return G.apply(n, t.getElementsByClassName(r)),
                            n
                    }
                if (!(!w.qsa || W[e + " "] || L && L.test(e))) {
                    if (1 !== g)
                        f = t,
                        h = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(yt, "\\$&") : t.setAttribute("id", s = q),
                        d = T(e),
                        a = d.length,
                        l = pt.test(s) ? "#" + s : "[id='" + s + "']"; a--; )
                            d[a] = l + " " + p(d[a]);
                        h = d.join(","),
                        f = vt.test(e) && u(t.parentNode) || t
                    }
                    if (h)
                        try {
                            return G.apply(n, f.querySelectorAll(h)),
                            n
                        } catch (m) {} finally {
                            s === q && t.removeAttribute("id")
                        }
                }
            }
            return E(e.replace(st, "$1"), t, n, i)
        }
        function n() {
            function e(n, i) {
                return t.push(n + " ") > x.cacheLength && delete e[t.shift()],
                e[n + " "] = i
            }
            var t = [];
            return e
        }
        function i(e) {
            return e[q] = !0,
            e
        }
        function r(e) {
            var t = M.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function a(e, t) {
            for (var n = e.split("|"), i = n.length; i--; )
                x.attrHandle[n[i]] = t
        }
        function o(e, t) {
            var n = t && e
              , i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (i)
                return i;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }
        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function c(e) {
            return i(function(t) {
                return t = +t,
                i(function(n, i) {
                    for (var r, a = e([], n.length, t), o = a.length; o--; )
                        n[r = a[o]] && (n[r] = !(i[r] = n[r]))
                })
            })
        }
        function u(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        function d() {}
        function p(e) {
            for (var t = 0, n = e.length, i = ""; n > t; t++)
                i += e[t].value;
            return i
        }
        function h(e, t, n) {
            var i = t.dir
              , r = n && "parentNode" === i
              , a = U++;
            return t.first ? function(t, n, a) {
                for (; t = t[i]; )
                    if (1 === t.nodeType || r)
                        return e(t, n, a)
            }
            : function(t, n, o) {
                var s, l, c, u = [B, a];
                if (o) {
                    for (; t = t[i]; )
                        if ((1 === t.nodeType || r) && e(t, n, o))
                            return !0
                } else
                    for (; t = t[i]; )
                        if (1 === t.nodeType || r) {
                            if (c = t[q] || (t[q] = {}),
                            l = c[t.uniqueID] || (c[t.uniqueID] = {}),
                            (s = l[i]) && s[0] === B && s[1] === a)
                                return u[2] = s[2];
                            if (l[i] = u,
                            u[2] = e(t, n, o))
                                return !0
                        }
            }
        }
        function f(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var r = e.length; r--; )
                    if (!e[r](t, n, i))
                        return !1;
                return !0
            }
            : e[0]
        }
        function g(e, n, i) {
            for (var r = 0, a = n.length; a > r; r++)
                t(e, n[r], i);
            return i
        }
        function m(e, t, n, i, r) {
            for (var a, o = [], s = 0, l = e.length, c = null != t; l > s; s++)
                (a = e[s]) && (!n || n(a, i, r)) && (o.push(a),
                c && t.push(s));
            return o
        }
        function b(e, t, n, r, a, o) {
            return r && !r[q] && (r = b(r)),
            a && !a[q] && (a = b(a, o)),
            i(function(i, o, s, l) {
                var c, u, d, p = [], h = [], f = o.length, b = i || g(t || "*", s.nodeType ? [s] : s, []), v = !e || !i && t ? b : m(b, p, e, s, l), y = n ? a || (i ? e : f || r) ? [] : o : v;
                if (n && n(v, y, s, l),
                r)
                    for (c = m(y, h),
                    r(c, [], s, l),
                    u = c.length; u--; )
                        (d = c[u]) && (y[h[u]] = !(v[h[u]] = d));
                if (i) {
                    if (a || e) {
                        if (a) {
                            for (c = [],
                            u = y.length; u--; )
                                (d = y[u]) && c.push(v[u] = d);
                            a(null, y = [], c, l)
                        }
                        for (u = y.length; u--; )
                            (d = y[u]) && (c = a ? et(i, d) : p[u]) > -1 && (i[c] = !(o[c] = d))
                    }
                } else
                    y = m(y === o ? y.splice(f, y.length) : y),
                    a ? a(null, o, y, l) : G.apply(o, y)
            })
        }
        function v(e) {
            for (var t, n, i, r = e.length, a = x.relative[e[0].type], o = a || x.relative[" "], s = a ? 1 : 0, l = h(function(e) {
                return e === t
            }, o, !0), c = h(function(e) {
                return et(t, e) > -1
            }, o, !0), u = [function(e, n, i) {
                var r = !a && (i || n !== D) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
                return t = null,
                r
            }
            ]; r > s; s++)
                if (n = x.relative[e[s].type])
                    u = [h(f(u), n)];
                else {
                    if (n = x.filter[e[s].type].apply(null, e[s].matches),
                    n[q]) {
                        for (i = ++s; r > i && !x.relative[e[i].type]; i++)
                            ;
                        return b(s > 1 && f(u), s > 1 && p(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(st, "$1"), n, i > s && v(e.slice(s, i)), r > i && v(e = e.slice(i)), r > i && p(e))
                    }
                    u.push(n)
                }
            return f(u)
        }
        function y(e, n) {
            var r = n.length > 0
              , a = e.length > 0
              , o = function(i, o, s, l, c) {
                var u, d, p, h = 0, f = "0", g = i && [], b = [], v = D, y = i || a && x.find.TAG("*", c), _ = B += null == v ? 1 : Math.random() || .1, w = y.length;
                for (c && (D = o === M || o || c); f !== w && null != (u = y[f]); f++) {
                    if (a && u) {
                        for (d = 0,
                        o || u.ownerDocument === M || (A(u),
                        s = !I); p = e[d++]; )
                            if (p(u, o || M, s)) {
                                l.push(u);
                                break
                            }
                        c && (B = _)
                    }
                    r && ((u = !p && u) && h--,
                    i && g.push(u))
                }
                if (h += f,
                r && f !== h) {
                    for (d = 0; p = n[d++]; )
                        p(g, b, o, s);
                    if (i) {
                        if (h > 0)
                            for (; f--; )
                                g[f] || b[f] || (b[f] = Q.call(l));
                        b = m(b)
                    }
                    G.apply(l, b),
                    c && !i && b.length > 0 && h + n.length > 1 && t.uniqueSort(l)
                }
                return c && (B = _,
                D = v),
                g
            };
            return r ? i(o) : o
        }
        var _, w, x, k, C, T, N, E, D, $, S, A, M, j, I, L, z, R, O, q = "sizzle" + 1 * new Date, F = e.document, B = 0, U = 0, H = n(), P = n(), W = n(), K = function(e, t) {
            return e === t && (S = !0),
            0
        }, V = 1 << 31, Y = {}.hasOwnProperty, Z = [], Q = Z.pop, X = Z.push, G = Z.push, J = Z.slice, et = function(e, t) {
            for (var n = 0, i = e.length; i > n; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, tt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", nt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", rt = "\\[" + nt + "*(" + it + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + nt + "*\\]", at = ":(" + it + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + rt + ")*)|.*)\\)|)", ot = new RegExp(nt + "+","g"), st = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$","g"), lt = new RegExp("^" + nt + "*," + nt + "*"), ct = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"), ut = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]","g"), dt = new RegExp(at), pt = new RegExp("^" + it + "$"), ht = {
            ID: new RegExp("^#(" + it + ")"),
            CLASS: new RegExp("^\\.(" + it + ")"),
            TAG: new RegExp("^(" + it + "|[*])"),
            ATTR: new RegExp("^" + rt),
            PSEUDO: new RegExp("^" + at),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)","i"),
            bool: new RegExp("^(?:" + tt + ")$","i"),
            needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)","i")
        }, ft = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, mt = /^[^{]+\{\s*\[native \w/, bt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, vt = /[+~]/, yt = /'|\\/g, _t = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)","ig"), wt = function(e, t, n) {
            var i = "0x" + t - 65536;
            return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
        }, xt = function() {
            A()
        };
        try {
            G.apply(Z = J.call(F.childNodes), F.childNodes),
            Z[F.childNodes.length].nodeType
        } catch (kt) {
            G = {
                apply: Z.length ? function(e, t) {
                    X.apply(e, J.call(t))
                }
                : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++]; )
                        ;
                    e.length = n - 1
                }
            }
        }
        w = t.support = {},
        C = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }
        ,
        A = t.setDocument = function(e) {
            var t, n, i = e ? e.ownerDocument || e : F;
            return i !== M && 9 === i.nodeType && i.documentElement ? (M = i,
            j = M.documentElement,
            I = !C(M),
            (n = M.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xt, !1) : n.attachEvent && n.attachEvent("onunload", xt)),
            w.attributes = r(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }),
            w.getElementsByTagName = r(function(e) {
                return e.appendChild(M.createComment("")),
                !e.getElementsByTagName("*").length
            }),
            w.getElementsByClassName = mt.test(M.getElementsByClassName),
            w.getById = r(function(e) {
                return j.appendChild(e).id = q,
                !M.getElementsByName || !M.getElementsByName(q).length
            }),
            w.getById ? (x.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && I) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ,
            x.filter.ID = function(e) {
                var t = e.replace(_t, wt);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ) : (delete x.find.ID,
            x.filter.ID = function(e) {
                var t = e.replace(_t, wt);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }
            ),
            x.find.TAG = w.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n, i = [], r = 0, a = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = a[r++]; )
                        1 === n.nodeType && i.push(n);
                    return i
                }
                return a
            }
            ,
            x.find.CLASS = w.getElementsByClassName && function(e, t) {
                return "undefined" != typeof t.getElementsByClassName && I ? t.getElementsByClassName(e) : void 0
            }
            ,
            z = [],
            L = [],
            (w.qsa = mt.test(M.querySelectorAll)) && (r(function(e) {
                j.appendChild(e).innerHTML = "<a id='" + q + "'></a><select id='" + q + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && L.push("[*^$]=" + nt + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || L.push("\\[" + nt + "*(?:value|" + tt + ")"),
                e.querySelectorAll("[id~=" + q + "-]").length || L.push("~="),
                e.querySelectorAll(":checked").length || L.push(":checked"),
                e.querySelectorAll("a#" + q + "+*").length || L.push(".#.+[+~]")
            }),
            r(function(e) {
                var t = M.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && L.push("name" + nt + "*[*^$|!~]?="),
                e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                L.push(",.*:")
            })),
            (w.matchesSelector = mt.test(R = j.matches || j.webkitMatchesSelector || j.mozMatchesSelector || j.oMatchesSelector || j.msMatchesSelector)) && r(function(e) {
                w.disconnectedMatch = R.call(e, "div"),
                R.call(e, "[s!='']:x"),
                z.push("!=", at)
            }),
            L = L.length && new RegExp(L.join("|")),
            z = z.length && new RegExp(z.join("|")),
            t = mt.test(j.compareDocumentPosition),
            O = t || mt.test(j.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            K = t ? function(e, t) {
                if (e === t)
                    return S = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1,
                1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === M || e.ownerDocument === F && O(F, e) ? -1 : t === M || t.ownerDocument === F && O(F, t) ? 1 : $ ? et($, e) - et($, t) : 0 : 4 & n ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return S = !0,
                    0;
                var n, i = 0, r = e.parentNode, a = t.parentNode, s = [e], l = [t];
                if (!r || !a)
                    return e === M ? -1 : t === M ? 1 : r ? -1 : a ? 1 : $ ? et($, e) - et($, t) : 0;
                if (r === a)
                    return o(e, t);
                for (n = e; n = n.parentNode; )
                    s.unshift(n);
                for (n = t; n = n.parentNode; )
                    l.unshift(n);
                for (; s[i] === l[i]; )
                    i++;
                return i ? o(s[i], l[i]) : s[i] === F ? -1 : l[i] === F ? 1 : 0
            }
            ,
            M) : M
        }
        ,
        t.matches = function(e, n) {
            return t(e, null, null, n)
        }
        ,
        t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== M && A(e),
            n = n.replace(ut, "='$1']"),
            !(!w.matchesSelector || !I || W[n + " "] || z && z.test(n) || L && L.test(n)))
                try {
                    var i = R.call(e, n);
                    if (i || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return i
                } catch (r) {}
            return t(n, M, null, [e]).length > 0
        }
        ,
        t.contains = function(e, t) {
            return (e.ownerDocument || e) !== M && A(e),
            O(e, t)
        }
        ,
        t.attr = function(e, t) {
            (e.ownerDocument || e) !== M && A(e);
            var n = x.attrHandle[t.toLowerCase()]
              , i = n && Y.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !I) : void 0;
            return void 0 !== i ? i : w.attributes || !I ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }
        ,
        t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        t.uniqueSort = function(e) {
            var t, n = [], i = 0, r = 0;
            if (S = !w.detectDuplicates,
            $ = !w.sortStable && e.slice(0),
            e.sort(K),
            S) {
                for (; t = e[r++]; )
                    t === e[r] && (i = n.push(r));
                for (; i--; )
                    e.splice(n[i], 1)
            }
            return $ = null,
            e
        }
        ,
        k = t.getText = function(e) {
            var t, n = "", i = 0, r = e.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += k(e)
                } else if (3 === r || 4 === r)
                    return e.nodeValue
            } else
                for (; t = e[i++]; )
                    n += k(t);
            return n
        }
        ,
        x = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: ht,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(_t, wt),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(_t, wt),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return ht.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && dt.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(_t, wt).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = H[e + " "];
                    return t || (t = new RegExp("(^|" + nt + ")" + e + "(" + nt + "|$)")) && H(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, i) {
                    return function(r) {
                        var a = t.attr(r, e);
                        return null == a ? "!=" === n : n ? (a += "",
                        "=" === n ? a === i : "!=" === n ? a !== i : "^=" === n ? i && 0 === a.indexOf(i) : "*=" === n ? i && a.indexOf(i) > -1 : "$=" === n ? i && a.slice(-i.length) === i : "~=" === n ? (" " + a.replace(ot, " ") + " ").indexOf(i) > -1 : "|=" === n ? a === i || a.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, i, r) {
                    var a = "nth" !== e.slice(0, 3)
                      , o = "last" !== e.slice(-4)
                      , s = "of-type" === t;
                    return 1 === i && 0 === r ? function(e) {
                        return !!e.parentNode
                    }
                    : function(t, n, l) {
                        var c, u, d, p, h, f, g = a !== o ? "nextSibling" : "previousSibling", m = t.parentNode, b = s && t.nodeName.toLowerCase(), v = !l && !s, y = !1;
                        if (m) {
                            if (a) {
                                for (; g; ) {
                                    for (p = t; p = p[g]; )
                                        if (s ? p.nodeName.toLowerCase() === b : 1 === p.nodeType)
                                            return !1;
                                    f = g = "only" === e && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [o ? m.firstChild : m.lastChild],
                            o && v) {
                                for (p = m,
                                d = p[q] || (p[q] = {}),
                                u = d[p.uniqueID] || (d[p.uniqueID] = {}),
                                c = u[e] || [],
                                h = c[0] === B && c[1],
                                y = h && c[2],
                                p = h && m.childNodes[h]; p = ++h && p && p[g] || (y = h = 0) || f.pop(); )
                                    if (1 === p.nodeType && ++y && p === t) {
                                        u[e] = [B, h, y];
                                        break
                                    }
                            } else if (v && (p = t,
                            d = p[q] || (p[q] = {}),
                            u = d[p.uniqueID] || (d[p.uniqueID] = {}),
                            c = u[e] || [],
                            h = c[0] === B && c[1],
                            y = h),
                            y === !1)
                                for (; (p = ++h && p && p[g] || (y = h = 0) || f.pop()) && ((s ? p.nodeName.toLowerCase() !== b : 1 !== p.nodeType) || !++y || (v && (d = p[q] || (p[q] = {}),
                                u = d[p.uniqueID] || (d[p.uniqueID] = {}),
                                u[e] = [B, y]),
                                p !== t)); )
                                    ;
                            return y -= r,
                            y === i || y % i === 0 && y / i >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var r, a = x.pseudos[e] || x.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return a[q] ? a(n) : a.length > 1 ? (r = [e, e, "", n],
                    x.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                        for (var i, r = a(e, n), o = r.length; o--; )
                            i = et(e, r[o]),
                            e[i] = !(t[i] = r[o])
                    }) : function(e) {
                        return a(e, 0, r)
                    }
                    ) : a
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = []
                      , n = []
                      , r = N(e.replace(st, "$1"));
                    return r[q] ? i(function(e, t, n, i) {
                        for (var a, o = r(e, null, i, []), s = e.length; s--; )
                            (a = o[s]) && (e[s] = !(t[s] = a))
                    }) : function(e, i, a) {
                        return t[0] = e,
                        r(t, null, a, n),
                        t[0] = null,
                        !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: i(function(e) {
                    return e = e.replace(_t, wt),
                    function(t) {
                        return (t.textContent || t.innerText || k(t)).indexOf(e) > -1
                    }
                }),
                lang: i(function(e) {
                    return pt.test(e || "") || t.error("unsupported lang: " + e),
                    e = e.replace(_t, wt).toLowerCase(),
                    function(t) {
                        var n;
                        do
                            if (n = I ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                return n = n.toLowerCase(),
                                n === e || 0 === n.indexOf(e + "-");
                        while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === j
                },
                focus: function(e) {
                    return e === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !x.pseudos.empty(e)
                },
                header: function(e) {
                    return gt.test(e.nodeName)
                },
                input: function(e) {
                    return ft.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(e, t) {
                    return [t - 1]
                }),
                eq: c(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: c(function(e, t) {
                    for (var n = 0; t > n; n += 2)
                        e.push(n);
                    return e
                }),
                odd: c(function(e, t) {
                    for (var n = 1; t > n; n += 2)
                        e.push(n);
                    return e
                }),
                lt: c(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; --i >= 0; )
                        e.push(i);
                    return e
                }),
                gt: c(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; ++i < t; )
                        e.push(i);
                    return e
                })
            }
        },
        x.pseudos.nth = x.pseudos.eq;
        for (_ in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            x.pseudos[_] = s(_);
        for (_ in {
            submit: !0,
            reset: !0
        })
            x.pseudos[_] = l(_);
        return d.prototype = x.filters = x.pseudos,
        x.setFilters = new d,
        T = t.tokenize = function(e, n) {
            var i, r, a, o, s, l, c, u = P[e + " "];
            if (u)
                return n ? 0 : u.slice(0);
            for (s = e,
            l = [],
            c = x.preFilter; s; ) {
                (!i || (r = lt.exec(s))) && (r && (s = s.slice(r[0].length) || s),
                l.push(a = [])),
                i = !1,
                (r = ct.exec(s)) && (i = r.shift(),
                a.push({
                    value: i,
                    type: r[0].replace(st, " ")
                }),
                s = s.slice(i.length));
                for (o in x.filter)
                    !(r = ht[o].exec(s)) || c[o] && !(r = c[o](r)) || (i = r.shift(),
                    a.push({
                        value: i,
                        type: o,
                        matches: r
                    }),
                    s = s.slice(i.length));
                if (!i)
                    break
            }
            return n ? s.length : s ? t.error(e) : P(e, l).slice(0)
        }
        ,
        N = t.compile = function(e, t) {
            var n, i = [], r = [], a = W[e + " "];
            if (!a) {
                for (t || (t = T(e)),
                n = t.length; n--; )
                    a = v(t[n]),
                    a[q] ? i.push(a) : r.push(a);
                a = W(e, y(r, i)),
                a.selector = e
            }
            return a
        }
        ,
        E = t.select = function(e, t, n, i) {
            var r, a, o, s, l, c = "function" == typeof e && e, d = !i && T(e = c.selector || e);
            if (n = n || [],
            1 === d.length) {
                if (a = d[0] = d[0].slice(0),
                a.length > 2 && "ID" === (o = a[0]).type && w.getById && 9 === t.nodeType && I && x.relative[a[1].type]) {
                    if (t = (x.find.ID(o.matches[0].replace(_t, wt), t) || [])[0],
                    !t)
                        return n;
                    c && (t = t.parentNode),
                    e = e.slice(a.shift().value.length)
                }
                for (r = ht.needsContext.test(e) ? 0 : a.length; r-- && (o = a[r],
                !x.relative[s = o.type]); )
                    if ((l = x.find[s]) && (i = l(o.matches[0].replace(_t, wt), vt.test(a[0].type) && u(t.parentNode) || t))) {
                        if (a.splice(r, 1),
                        e = i.length && p(a),
                        !e)
                            return G.apply(n, i),
                            n;
                        break
                    }
            }
            return (c || N(e, d))(i, t, !I, n, !t || vt.test(e) && u(t.parentNode) || t),
            n
        }
        ,
        w.sortStable = q.split("").sort(K).join("") === q,
        w.detectDuplicates = !!S,
        A(),
        w.sortDetached = r(function(e) {
            return 1 & e.compareDocumentPosition(M.createElement("div"))
        }),
        r(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || a("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        w.attributes && r(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || a("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }),
        r(function(e) {
            return null == e.getAttribute("disabled")
        }) || a(tt, function(e, t, n) {
            var i;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }),
        t
    }(e);
    ht.find = vt,
    ht.expr = vt.selectors,
    ht.expr[":"] = ht.expr.pseudos,
    ht.uniqueSort = ht.unique = vt.uniqueSort,
    ht.text = vt.getText,
    ht.isXMLDoc = vt.isXML,
    ht.contains = vt.contains;
    var yt = function(e, t, n) {
        for (var i = [], r = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
                if (r && ht(e).is(n))
                    break;
                i.push(e)
            }
        return i
    }
      , _t = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n
    }
      , wt = ht.expr.match.needsContext
      , xt = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
      , kt = /^.[^:#\[\.,]*$/;
    ht.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === i.nodeType ? ht.find.matchesSelector(i, e) ? [i] : [] : ht.find.matches(e, ht.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }
    ,
    ht.fn.extend({
        find: function(e) {
            var t, n = [], i = this, r = i.length;
            if ("string" != typeof e)
                return this.pushStack(ht(e).filter(function() {
                    for (t = 0; r > t; t++)
                        if (ht.contains(i[t], this))
                            return !0
                }));
            for (t = 0; r > t; t++)
                ht.find(e, i[t], n);
            return n = this.pushStack(r > 1 ? ht.unique(n) : n),
            n.selector = this.selector ? this.selector + " " + e : e,
            n
        },
        filter: function(e) {
            return this.pushStack(i(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(i(this, e || [], !0))
        },
        is: function(e) {
            return !!i(this, "string" == typeof e && wt.test(e) ? ht(e) : e || [], !1).length
        }
    });
    var Ct, Tt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, Nt = ht.fn.init = function(e, t, n) {
        var i, r;
        if (!e)
            return this;
        if (n = n || Ct,
        "string" == typeof e) {
            if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : Tt.exec(e),
            !i || !i[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof ht ? t[0] : t,
                ht.merge(this, ht.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : it, !0)),
                xt.test(i[1]) && ht.isPlainObject(t))
                    for (i in t)
                        ht.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            if (r = it.getElementById(i[2]),
            r && r.parentNode) {
                if (r.id !== i[2])
                    return Ct.find(e);
                this.length = 1,
                this[0] = r
            }
            return this.context = it,
            this.selector = e,
            this
        }
        return e.nodeType ? (this.context = this[0] = e,
        this.length = 1,
        this) : ht.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(ht) : (void 0 !== e.selector && (this.selector = e.selector,
        this.context = e.context),
        ht.makeArray(e, this))
    }
    ;
    Nt.prototype = ht.fn,
    Ct = ht(it);
    var Et = /^(?:parents|prev(?:Until|All))/
      , Dt = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    ht.fn.extend({
        has: function(e) {
            var t, n = ht(e, this), i = n.length;
            return this.filter(function() {
                for (t = 0; i > t; t++)
                    if (ht.contains(this, n[t]))
                        return !0
            })
        },
        closest: function(e, t) {
            for (var n, i = 0, r = this.length, a = [], o = wt.test(e) || "string" != typeof e ? ht(e, t || this.context) : 0; r > i; i++)
                for (n = this[i]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && ht.find.matchesSelector(n, e))) {
                        a.push(n);
                        break
                    }
            return this.pushStack(a.length > 1 ? ht.uniqueSort(a) : a)
        },
        index: function(e) {
            return e ? "string" == typeof e ? ht.inArray(this[0], ht(e)) : ht.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(ht.uniqueSort(ht.merge(this.get(), ht(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    ht.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return yt(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return yt(e, "parentNode", n)
        },
        next: function(e) {
            return r(e, "nextSibling")
        },
        prev: function(e) {
            return r(e, "previousSibling")
        },
        nextAll: function(e) {
            return yt(e, "nextSibling")
        },
        prevAll: function(e) {
            return yt(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return yt(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return yt(e, "previousSibling", n)
        },
        siblings: function(e) {
            return _t((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return _t(e.firstChild)
        },
        contents: function(e) {
            return ht.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ht.merge([], e.childNodes)
        }
    }, function(e, t) {
        ht.fn[e] = function(n, i) {
            var r = ht.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n),
            i && "string" == typeof i && (r = ht.filter(i, r)),
            this.length > 1 && (Dt[e] || (r = ht.uniqueSort(r)),
            Et.test(e) && (r = r.reverse())),
            this.pushStack(r)
        }
    });
    var $t = /\S+/g;
    ht.Callbacks = function(e) {
        e = "string" == typeof e ? a(e) : ht.extend({}, e);
        var t, n, i, r, o = [], s = [], l = -1, c = function() {
            for (r = e.once,
            i = t = !0; s.length; l = -1)
                for (n = s.shift(); ++l < o.length; )
                    o[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = o.length,
                    n = !1);
            e.memory || (n = !1),
            t = !1,
            r && (o = n ? [] : "")
        }, u = {
            add: function() {
                return o && (n && !t && (l = o.length - 1,
                s.push(n)),
                function i(t) {
                    ht.each(t, function(t, n) {
                        ht.isFunction(n) ? e.unique && u.has(n) || o.push(n) : n && n.length && "string" !== ht.type(n) && i(n)
                    })
                }(arguments),
                n && !t && c()),
                this
            },
            remove: function() {
                return ht.each(arguments, function(e, t) {
                    for (var n; (n = ht.inArray(t, o, n)) > -1; )
                        o.splice(n, 1),
                        l >= n && l--
                }),
                this
            },
            has: function(e) {
                return e ? ht.inArray(e, o) > -1 : o.length > 0
            },
            empty: function() {
                return o && (o = []),
                this
            },
            disable: function() {
                return r = s = [],
                o = n = "",
                this
            },
            disabled: function() {
                return !o
            },
            lock: function() {
                return r = !0,
                n || u.disable(),
                this
            },
            locked: function() {
                return !!r
            },
            fireWith: function(e, n) {
                return r || (n = n || [],
                n = [e, n.slice ? n.slice() : n],
                s.push(n),
                t || c()),
                this
            },
            fire: function() {
                return u.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!i
            }
        };
        return u
    }
    ,
    ht.extend({
        Deferred: function(e) {
            var t = [["resolve", "done", ht.Callbacks("once memory"), "resolved"], ["reject", "fail", ht.Callbacks("once memory"), "rejected"], ["notify", "progress", ht.Callbacks("memory")]]
              , n = "pending"
              , i = {
                state: function() {
                    return n
                },
                always: function() {
                    return r.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var e = arguments;
                    return ht.Deferred(function(n) {
                        ht.each(t, function(t, a) {
                            var o = ht.isFunction(e[t]) && e[t];
                            r[a[1]](function() {
                                var e = o && o.apply(this, arguments);
                                e && ht.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[a[0] + "With"](this === i ? n.promise() : this, o ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? ht.extend(e, i) : i
                }
            }
              , r = {};
            return i.pipe = i.then,
            ht.each(t, function(e, a) {
                var o = a[2]
                  , s = a[3];
                i[a[1]] = o.add,
                s && o.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock),
                r[a[0]] = function() {
                    return r[a[0] + "With"](this === r ? i : this, arguments),
                    this
                }
                ,
                r[a[0] + "With"] = o.fireWith
            }),
            i.promise(r),
            e && e.call(r, r),
            r
        },
        when: function(e) {
            var t, n, i, r = 0, a = rt.call(arguments), o = a.length, s = 1 !== o || e && ht.isFunction(e.promise) ? o : 0, l = 1 === s ? e : ht.Deferred(), c = function(e, n, i) {
                return function(r) {
                    n[e] = this,
                    i[e] = arguments.length > 1 ? rt.call(arguments) : r,
                    i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                }
            };
            if (o > 1)
                for (t = new Array(o),
                n = new Array(o),
                i = new Array(o); o > r; r++)
                    a[r] && ht.isFunction(a[r].promise) ? a[r].promise().progress(c(r, n, t)).done(c(r, i, a)).fail(l.reject) : --s;
            return s || l.resolveWith(i, a),
            l.promise()
        }
    });
    var St;
    ht.fn.ready = function(e) {
        return ht.ready.promise().done(e),
        this
    }
    ,
    ht.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? ht.readyWait++ : ht.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --ht.readyWait : ht.isReady) || (ht.isReady = !0,
            e !== !0 && --ht.readyWait > 0 || (St.resolveWith(it, [ht]),
            ht.fn.triggerHandler && (ht(it).triggerHandler("ready"),
            ht(it).off("ready"))))
        }
    }),
    ht.ready.promise = function(t) {
        if (!St)
            if (St = ht.Deferred(),
            "complete" === it.readyState || "loading" !== it.readyState && !it.documentElement.doScroll)
                e.setTimeout(ht.ready);
            else if (it.addEventListener)
                it.addEventListener("DOMContentLoaded", s),
                e.addEventListener("load", s);
            else {
                it.attachEvent("onreadystatechange", s),
                e.attachEvent("onload", s);
                var n = !1;
                try {
                    n = null == e.frameElement && it.documentElement
                } catch (i) {}
                n && n.doScroll && !function r() {
                    if (!ht.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (t) {
                            return e.setTimeout(r, 50)
                        }
                        o(),
                        ht.ready()
                    }
                }()
            }
        return St.promise(t)
    }
    ,
    ht.ready.promise();
    var At;
    for (At in ht(dt))
        break;
    dt.ownFirst = "0" === At,
    dt.inlineBlockNeedsLayout = !1,
    ht(function() {
        var e, t, n, i;
        n = it.getElementsByTagName("body")[0],
        n && n.style && (t = it.createElement("div"),
        i = it.createElement("div"),
        i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
        n.appendChild(i).appendChild(t),
        "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
        dt.inlineBlockNeedsLayout = e = 3 === t.offsetWidth,
        e && (n.style.zoom = 1)),
        n.removeChild(i))
    }),
    function() {
        var e = it.createElement("div");
        dt.deleteExpando = !0;
        try {
            delete e.test
        } catch (t) {
            dt.deleteExpando = !1
        }
        e = null
    }();
    var Mt = function(e) {
        var t = ht.noData[(e.nodeName + " ").toLowerCase()]
          , n = +e.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
    }
      , jt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , It = /([A-Z])/g;
    ht.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? ht.cache[e[ht.expando]] : e[ht.expando],
            !!e && !c(e)
        },
        data: function(e, t, n) {
            return u(e, t, n)
        },
        removeData: function(e, t) {
            return d(e, t)
        },
        _data: function(e, t, n) {
            return u(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return d(e, t, !0)
        }
    }),
    ht.fn.extend({
        data: function(e, t) {
            var n, i, r, a = this[0], o = a && a.attributes;
            if (void 0 === e) {
                if (this.length && (r = ht.data(a),
                1 === a.nodeType && !ht._data(a, "parsedAttrs"))) {
                    for (n = o.length; n--; )
                        o[n] && (i = o[n].name,
                        0 === i.indexOf("data-") && (i = ht.camelCase(i.slice(5)),
                        l(a, i, r[i])));
                    ht._data(a, "parsedAttrs", !0)
                }
                return r
            }
            return "object" == typeof e ? this.each(function() {
                ht.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                ht.data(this, e, t)
            }) : a ? l(a, e, ht.data(a, e)) : void 0
        },
        removeData: function(e) {
            return this.each(function() {
                ht.removeData(this, e)
            })
        }
    }),
    ht.extend({
        queue: function(e, t, n) {
            var i;
            return e ? (t = (t || "fx") + "queue",
            i = ht._data(e, t),
            n && (!i || ht.isArray(n) ? i = ht._data(e, t, ht.makeArray(n)) : i.push(n)),
            i || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = ht.queue(e, t)
              , i = n.length
              , r = n.shift()
              , a = ht._queueHooks(e, t)
              , o = function() {
                ht.dequeue(e, t)
            };
            "inprogress" === r && (r = n.shift(),
            i--),
            r && ("fx" === t && n.unshift("inprogress"),
            delete a.stop,
            r.call(e, o, a)),
            !i && a && a.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return ht._data(e, n) || ht._data(e, n, {
                empty: ht.Callbacks("once memory").add(function() {
                    ht._removeData(e, t + "queue"),
                    ht._removeData(e, n)
                })
            })
        }
    }),
    ht.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e,
            e = "fx",
            n--),
            arguments.length < n ? ht.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = ht.queue(this, e, t);
                ht._queueHooks(this, e),
                "fx" === e && "inprogress" !== n[0] && ht.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                ht.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, i = 1, r = ht.Deferred(), a = this, o = this.length, s = function() {
                --i || r.resolveWith(a, [a])
            };
            for ("string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx"; o--; )
                n = ht._data(a[o], e + "queueHooks"),
                n && n.empty && (i++,
                n.empty.add(s));
            return s(),
            r.promise(t)
        }
    }),
    function() {
        var e;
        dt.shrinkWrapBlocks = function() {
            if (null != e)
                return e;
            e = !1;
            var t, n, i;
            return n = it.getElementsByTagName("body")[0],
            n && n.style ? (t = it.createElement("div"),
            i = it.createElement("div"),
            i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            n.appendChild(i).appendChild(t),
            "undefined" != typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
            t.appendChild(it.createElement("div")).style.width = "5px",
            e = 3 !== t.offsetWidth),
            n.removeChild(i),
            e) : void 0
        }
    }();
    var Lt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , zt = new RegExp("^(?:([+-])=|)(" + Lt + ")([a-z%]*)$","i")
      , Rt = ["Top", "Right", "Bottom", "Left"]
      , Ot = function(e, t) {
        return e = t || e,
        "none" === ht.css(e, "display") || !ht.contains(e.ownerDocument, e)
    }
      , qt = function(e, t, n, i, r, a, o) {
        var s = 0
          , l = e.length
          , c = null == n;
        if ("object" === ht.type(n)) {
            r = !0;
            for (s in n)
                qt(e, t, s, n[s], !0, a, o)
        } else if (void 0 !== i && (r = !0,
        ht.isFunction(i) || (o = !0),
        c && (o ? (t.call(e, i),
        t = null) : (c = t,
        t = function(e, t, n) {
            return c.call(ht(e), n)
        }
        )),
        t))
            for (; l > s; s++)
                t(e[s], n, o ? i : i.call(e[s], s, t(e[s], n)));
        return r ? e : c ? t.call(e) : l ? t(e[0], n) : a
    }
      , Ft = /^(?:checkbox|radio)$/i
      , Bt = /<([\w:-]+)/
      , Ut = /^$|\/(?:java|ecma)script/i
      , Ht = /^\s+/
      , Pt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    !function() {
        var e = it.createElement("div")
          , t = it.createDocumentFragment()
          , n = it.createElement("input");
        e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        dt.leadingWhitespace = 3 === e.firstChild.nodeType,
        dt.tbody = !e.getElementsByTagName("tbody").length,
        dt.htmlSerialize = !!e.getElementsByTagName("link").length,
        dt.html5Clone = "<:nav></:nav>" !== it.createElement("nav").cloneNode(!0).outerHTML,
        n.type = "checkbox",
        n.checked = !0,
        t.appendChild(n),
        dt.appendChecked = n.checked,
        e.innerHTML = "<textarea>x</textarea>",
        dt.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue,
        t.appendChild(e),
        n = it.createElement("input"),
        n.setAttribute("type", "radio"),
        n.setAttribute("checked", "checked"),
        n.setAttribute("name", "t"),
        e.appendChild(n),
        dt.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked,
        dt.noCloneEvent = !!e.addEventListener,
        e[ht.expando] = 1,
        dt.attributes = !e.getAttribute(ht.expando)
    }();
    var Wt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: dt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    Wt.optgroup = Wt.option,
    Wt.tbody = Wt.tfoot = Wt.colgroup = Wt.caption = Wt.thead,
    Wt.th = Wt.td;
    var Kt = /<|&#?\w+;/
      , Vt = /<tbody/i;
    !function() {
        var t, n, i = it.createElement("div");
        for (t in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            n = "on" + t,
            (dt[t] = n in e) || (i.setAttribute(n, "t"),
            dt[t] = i.attributes[n].expando === !1);
        i = null
    }();
    var Yt = /^(?:input|select|textarea)$/i
      , Zt = /^key/
      , Qt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , Xt = /^(?:focusinfocus|focusoutblur)$/
      , Gt = /^([^.]*)(?:\.(.+)|)/;
    ht.event = {
        global: {},
        add: function(e, t, n, i, r) {
            var a, o, s, l, c, u, d, p, h, f, g, m = ht._data(e);
            if (m) {
                for (n.handler && (l = n,
                n = l.handler,
                r = l.selector),
                n.guid || (n.guid = ht.guid++),
                (o = m.events) || (o = m.events = {}),
                (u = m.handle) || (u = m.handle = function(e) {
                    return "undefined" == typeof ht || e && ht.event.triggered === e.type ? void 0 : ht.event.dispatch.apply(u.elem, arguments)
                }
                ,
                u.elem = e),
                t = (t || "").match($t) || [""],
                s = t.length; s--; )
                    a = Gt.exec(t[s]) || [],
                    h = g = a[1],
                    f = (a[2] || "").split(".").sort(),
                    h && (c = ht.event.special[h] || {},
                    h = (r ? c.delegateType : c.bindType) || h,
                    c = ht.event.special[h] || {},
                    d = ht.extend({
                        type: h,
                        origType: g,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && ht.expr.match.needsContext.test(r),
                        namespace: f.join(".")
                    }, l),
                    (p = o[h]) || (p = o[h] = [],
                    p.delegateCount = 0,
                    c.setup && c.setup.call(e, i, f, u) !== !1 || (e.addEventListener ? e.addEventListener(h, u, !1) : e.attachEvent && e.attachEvent("on" + h, u))),
                    c.add && (c.add.call(e, d),
                    d.handler.guid || (d.handler.guid = n.guid)),
                    r ? p.splice(p.delegateCount++, 0, d) : p.push(d),
                    ht.event.global[h] = !0);
                e = null
            }
        },
        remove: function(e, t, n, i, r) {
            var a, o, s, l, c, u, d, p, h, f, g, m = ht.hasData(e) && ht._data(e);
            if (m && (u = m.events)) {
                for (t = (t || "").match($t) || [""],
                c = t.length; c--; )
                    if (s = Gt.exec(t[c]) || [],
                    h = g = s[1],
                    f = (s[2] || "").split(".").sort(),
                    h) {
                        for (d = ht.event.special[h] || {},
                        h = (i ? d.delegateType : d.bindType) || h,
                        p = u[h] || [],
                        s = s[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        l = a = p.length; a--; )
                            o = p[a],
                            !r && g !== o.origType || n && n.guid !== o.guid || s && !s.test(o.namespace) || i && i !== o.selector && ("**" !== i || !o.selector) || (p.splice(a, 1),
                            o.selector && p.delegateCount--,
                            d.remove && d.remove.call(e, o));
                        l && !p.length && (d.teardown && d.teardown.call(e, f, m.handle) !== !1 || ht.removeEvent(e, h, m.handle),
                        delete u[h])
                    } else
                        for (h in u)
                            ht.event.remove(e, h + t[c], n, i, !0);
                ht.isEmptyObject(u) && (delete m.handle,
                ht._removeData(e, "events"))
            }
        },
        trigger: function(t, n, i, r) {
            var a, o, s, l, c, u, d, p = [i || it], h = ut.call(t, "type") ? t.type : t, f = ut.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = u = i = i || it,
            3 !== i.nodeType && 8 !== i.nodeType && !Xt.test(h + ht.event.triggered) && (h.indexOf(".") > -1 && (f = h.split("."),
            h = f.shift(),
            f.sort()),
            o = h.indexOf(":") < 0 && "on" + h,
            t = t[ht.expando] ? t : new ht.Event(h,"object" == typeof t && t),
            t.isTrigger = r ? 2 : 3,
            t.namespace = f.join("."),
            t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            t.result = void 0,
            t.target || (t.target = i),
            n = null == n ? [t] : ht.makeArray(n, [t]),
            c = ht.event.special[h] || {},
            r || !c.trigger || c.trigger.apply(i, n) !== !1)) {
                if (!r && !c.noBubble && !ht.isWindow(i)) {
                    for (l = c.delegateType || h,
                    Xt.test(l + h) || (s = s.parentNode); s; s = s.parentNode)
                        p.push(s),
                        u = s;
                    u === (i.ownerDocument || it) && p.push(u.defaultView || u.parentWindow || e)
                }
                for (d = 0; (s = p[d++]) && !t.isPropagationStopped(); )
                    t.type = d > 1 ? l : c.bindType || h,
                    a = (ht._data(s, "events") || {})[t.type] && ht._data(s, "handle"),
                    a && a.apply(s, n),
                    a = o && s[o],
                    a && a.apply && Mt(s) && (t.result = a.apply(s, n),
                    t.result === !1 && t.preventDefault());
                if (t.type = h,
                !r && !t.isDefaultPrevented() && (!c._default || c._default.apply(p.pop(), n) === !1) && Mt(i) && o && i[h] && !ht.isWindow(i)) {
                    u = i[o],
                    u && (i[o] = null),
                    ht.event.triggered = h;
                    try {
                        i[h]()
                    } catch (g) {}
                    ht.event.triggered = void 0,
                    u && (i[o] = u)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = ht.event.fix(e);
            var t, n, i, r, a, o = [], s = rt.call(arguments), l = (ht._data(this, "events") || {})[e.type] || [], c = ht.event.special[e.type] || {};
            if (s[0] = e,
            e.delegateTarget = this,
            !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                for (o = ht.event.handlers.call(this, e, l),
                t = 0; (r = o[t++]) && !e.isPropagationStopped(); )
                    for (e.currentTarget = r.elem,
                    n = 0; (a = r.handlers[n++]) && !e.isImmediatePropagationStopped(); )
                        (!e.rnamespace || e.rnamespace.test(a.namespace)) && (e.handleObj = a,
                        e.data = a.data,
                        i = ((ht.event.special[a.origType] || {}).handle || a.handler).apply(r.elem, s),
                        void 0 !== i && (e.result = i) === !1 && (e.preventDefault(),
                        e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e),
                e.result
            }
        },
        handlers: function(e, t) {
            var n, i, r, a, o = [], s = t.delegateCount, l = e.target;
            if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                        for (i = [],
                        n = 0; s > n; n++)
                            a = t[n],
                            r = a.selector + " ",
                            void 0 === i[r] && (i[r] = a.needsContext ? ht(r, this).index(l) > -1 : ht.find(r, this, null, [l]).length),
                            i[r] && i.push(a);
                        i.length && o.push({
                            elem: l,
                            handlers: i
                        })
                    }
            return s < t.length && o.push({
                elem: this,
                handlers: t.slice(s)
            }),
            o
        },
        fix: function(e) {
            if (e[ht.expando])
                return e;
            var t, n, i, r = e.type, a = e, o = this.fixHooks[r];
            for (o || (this.fixHooks[r] = o = Qt.test(r) ? this.mouseHooks : Zt.test(r) ? this.keyHooks : {}),
            i = o.props ? this.props.concat(o.props) : this.props,
            e = new ht.Event(a),
            t = i.length; t--; )
                n = i[t],
                e[n] = a[n];
            return e.target || (e.target = a.srcElement || it),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
            e.metaKey = !!e.metaKey,
            o.filter ? o.filter(e, a) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, i, r, a = t.button, o = t.fromElement;
                return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || it,
                r = i.documentElement,
                n = i.body,
                e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0),
                e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)),
                !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o),
                e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0),
                e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== _() && this.focus)
                        try {
                            return this.focus(),
                            !1
                        } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === _() && this.blur ? (this.blur(),
                    !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return ht.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(),
                    !1) : void 0
                },
                _default: function(e) {
                    return ht.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n) {
            var i = ht.extend(new ht.Event, n, {
                type: e,
                isSimulated: !0
            });
            ht.event.trigger(i, null, t),
            i.isDefaultPrevented() && n.preventDefault()
        }
    },
    ht.removeEvent = it.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    : function(e, t, n) {
        var i = "on" + t;
        e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null),
        e.detachEvent(i, n))
    }
    ,
    ht.Event = function(e, t) {
        return this instanceof ht.Event ? (e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? v : y) : this.type = e,
        t && ht.extend(this, t),
        this.timeStamp = e && e.timeStamp || ht.now(),
        void (this[ht.expando] = !0)) : new ht.Event(e,t)
    }
    ,
    ht.Event.prototype = {
        constructor: ht.Event,
        isDefaultPrevented: y,
        isPropagationStopped: y,
        isImmediatePropagationStopped: y,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = v,
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = v,
            e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(),
            e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = v,
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    ht.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        ht.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this, r = e.relatedTarget, a = e.handleObj;
                return (!r || r !== i && !ht.contains(i, r)) && (e.type = a.origType,
                n = a.handler.apply(this, arguments),
                e.type = t),
                n
            }
        }
    }),
    dt.submit || (ht.event.special.submit = {
        setup: function() {
            return ht.nodeName(this, "form") ? !1 : void ht.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target
                  , n = ht.nodeName(t, "input") || ht.nodeName(t, "button") ? ht.prop(t, "form") : void 0;
                n && !ht._data(n, "submit") && (ht.event.add(n, "submit._submit", function(e) {
                    e._submitBubble = !0
                }),
                ht._data(n, "submit", !0))
            })
        },
        postDispatch: function(e) {
            e._submitBubble && (delete e._submitBubble,
            this.parentNode && !e.isTrigger && ht.event.simulate("submit", this.parentNode, e))
        },
        teardown: function() {
            return ht.nodeName(this, "form") ? !1 : void ht.event.remove(this, "._submit")
        }
    }),
    dt.change || (ht.event.special.change = {
        setup: function() {
            return Yt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ht.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
            }),
            ht.event.add(this, "click._change", function(e) {
                this._justChanged && !e.isTrigger && (this._justChanged = !1),
                ht.event.simulate("change", this, e)
            })),
            !1) : void ht.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Yt.test(t.nodeName) && !ht._data(t, "change") && (ht.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || ht.event.simulate("change", this.parentNode, e)
                }),
                ht._data(t, "change", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return ht.event.remove(this, "._change"),
            !Yt.test(this.nodeName)
        }
    }),
    dt.focusin || ht.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            ht.event.simulate(t, e.target, ht.event.fix(e))
        };
        ht.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this
                  , r = ht._data(i, t);
                r || i.addEventListener(e, n, !0),
                ht._data(i, t, (r || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this
                  , r = ht._data(i, t) - 1;
                r ? ht._data(i, t, r) : (i.removeEventListener(e, n, !0),
                ht._removeData(i, t))
            }
        }
    }),
    ht.fn.extend({
        on: function(e, t, n, i) {
            return w(this, e, t, n, i)
        },
        one: function(e, t, n, i) {
            return w(this, e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, r;
            if (e && e.preventDefault && e.handleObj)
                return i = e.handleObj,
                ht(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler),
                this;
            if ("object" == typeof e) {
                for (r in e)
                    this.off(r, t, e[r]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t,
            t = void 0),
            n === !1 && (n = y),
            this.each(function() {
                ht.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                ht.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? ht.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Jt = / jQuery\d+="(?:null|\d+)"/g
      , en = new RegExp("<(?:" + Pt + ")[\\s/>]","i")
      , tn = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
      , nn = /<script|<style|<link/i
      , rn = /checked\s*(?:[^=]|=\s*.checked.)/i
      , an = /^true\/(.*)/
      , on = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , sn = h(it)
      , ln = sn.appendChild(it.createElement("div"));
    ht.extend({
        htmlPrefilter: function(e) {
            return e.replace(tn, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var i, r, a, o, s, l = ht.contains(e.ownerDocument, e);
            if (dt.html5Clone || ht.isXMLDoc(e) || !en.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (ln.innerHTML = e.outerHTML,
            ln.removeChild(a = ln.firstChild)),
            !(dt.noCloneEvent && dt.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ht.isXMLDoc(e)))
                for (i = f(a),
                s = f(e),
                o = 0; null != (r = s[o]); ++o)
                    i[o] && N(r, i[o]);
            if (t)
                if (n)
                    for (s = s || f(e),
                    i = i || f(a),
                    o = 0; null != (r = s[o]); o++)
                        T(r, i[o]);
                else
                    T(e, a);
            return i = f(a, "script"),
            i.length > 0 && g(i, !l && f(e, "script")),
            i = s = r = null,
            a
        },
        cleanData: function(e, t) {
            for (var n, i, r, a, o = 0, s = ht.expando, l = ht.cache, c = dt.attributes, u = ht.event.special; null != (n = e[o]); o++)
                if ((t || Mt(n)) && (r = n[s],
                a = r && l[r])) {
                    if (a.events)
                        for (i in a.events)
                            u[i] ? ht.event.remove(n, i) : ht.removeEvent(n, i, a.handle);
                    l[r] && (delete l[r],
                    c || "undefined" == typeof n.removeAttribute ? n[s] = void 0 : n.removeAttribute(s),
                    nt.push(r))
                }
        }
    }),
    ht.fn.extend({
        domManip: E,
        detach: function(e) {
            return D(this, e, !0)
        },
        remove: function(e) {
            return D(this, e)
        },
        text: function(e) {
            return qt(this, function(e) {
                return void 0 === e ? ht.text(this) : this.empty().append((this[0] && this[0].ownerDocument || it).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return E(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = x(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return E(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = x(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return E(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return E(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && ht.cleanData(f(e, !1)); e.firstChild; )
                    e.removeChild(e.firstChild);
                e.options && ht.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e,
            t = null == t ? e : t,
            this.map(function() {
                return ht.clone(this, e, t)
            })
        },
        html: function(e) {
            return qt(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , i = this.length;
                if (void 0 === e)
                    return 1 === t.nodeType ? t.innerHTML.replace(Jt, "") : void 0;
                if (!("string" != typeof e || nn.test(e) || !dt.htmlSerialize && en.test(e) || !dt.leadingWhitespace && Ht.test(e) || Wt[(Bt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = ht.htmlPrefilter(e);
                    try {
                        for (; i > n; n++)
                            t = this[n] || {},
                            1 === t.nodeType && (ht.cleanData(f(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (r) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return E(this, arguments, function(t) {
                var n = this.parentNode;
                ht.inArray(this, e) < 0 && (ht.cleanData(f(this)),
                n && n.replaceChild(t, this))
            }, e)
        }
    }),
    ht.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        ht.fn[e] = function(e) {
            for (var n, i = 0, r = [], a = ht(e), o = a.length - 1; o >= i; i++)
                n = i === o ? this : this.clone(!0),
                ht(a[i])[t](n),
                ot.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var cn, un = {
        HTML: "block",
        BODY: "block"
    }, dn = /^margin/, pn = new RegExp("^(" + Lt + ")(?!px)[a-z%]+$","i"), hn = function(e, t, n, i) {
        var r, a, o = {};
        for (a in t)
            o[a] = e.style[a],
            e.style[a] = t[a];
        r = n.apply(e, i || []);
        for (a in t)
            e.style[a] = o[a];
        return r
    }, fn = it.documentElement;
    !function() {
        function t() {
            var t, u, d = it.documentElement;
            d.appendChild(l),
            c.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
            n = r = s = !1,
            i = o = !0,
            e.getComputedStyle && (u = e.getComputedStyle(c),
            n = "1%" !== (u || {}).top,
            s = "2px" === (u || {}).marginLeft,
            r = "4px" === (u || {
                width: "4px"
            }).width,
            c.style.marginRight = "50%",
            i = "4px" === (u || {
                marginRight: "4px"
            }).marginRight,
            t = c.appendChild(it.createElement("div")),
            t.style.cssText = c.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
            t.style.marginRight = t.style.width = "0",
            c.style.width = "1px",
            o = !parseFloat((e.getComputedStyle(t) || {}).marginRight),
            c.removeChild(t)),
            c.style.display = "none",
            a = 0 === c.getClientRects().length,
            a && (c.style.display = "",
            c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            c.childNodes[0].style.borderCollapse = "separate",
            t = c.getElementsByTagName("td"),
            t[0].style.cssText = "margin:0;border:0;padding:0;display:none",
            a = 0 === t[0].offsetHeight,
            a && (t[0].style.display = "",
            t[1].style.display = "none",
            a = 0 === t[0].offsetHeight)),
            d.removeChild(l)
        }
        var n, i, r, a, o, s, l = it.createElement("div"), c = it.createElement("div");
        c.style && (c.style.cssText = "float:left;opacity:.5",
        dt.opacity = "0.5" === c.style.opacity,
        dt.cssFloat = !!c.style.cssFloat,
        c.style.backgroundClip = "content-box",
        c.cloneNode(!0).style.backgroundClip = "",
        dt.clearCloneStyle = "content-box" === c.style.backgroundClip,
        l = it.createElement("div"),
        l.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
        c.innerHTML = "",
        l.appendChild(c),
        dt.boxSizing = "" === c.style.boxSizing || "" === c.style.MozBoxSizing || "" === c.style.WebkitBoxSizing,
        ht.extend(dt, {
            reliableHiddenOffsets: function() {
                return null == n && t(),
                a
            },
            boxSizingReliable: function() {
                return null == n && t(),
                r
            },
            pixelMarginRight: function() {
                return null == n && t(),
                i
            },
            pixelPosition: function() {
                return null == n && t(),
                n
            },
            reliableMarginRight: function() {
                return null == n && t(),
                o
            },
            reliableMarginLeft: function() {
                return null == n && t(),
                s
            }
        }))
    }();
    var gn, mn, bn = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (gn = function(t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e),
        n.getComputedStyle(t)
    }
    ,
    mn = function(e, t, n) {
        var i, r, a, o, s = e.style;
        return n = n || gn(e),
        o = n ? n.getPropertyValue(t) || n[t] : void 0,
        "" !== o && void 0 !== o || ht.contains(e.ownerDocument, e) || (o = ht.style(e, t)),
        n && !dt.pixelMarginRight() && pn.test(o) && dn.test(t) && (i = s.width,
        r = s.minWidth,
        a = s.maxWidth,
        s.minWidth = s.maxWidth = s.width = o,
        o = n.width,
        s.width = i,
        s.minWidth = r,
        s.maxWidth = a),
        void 0 === o ? o : o + ""
    }
    ) : fn.currentStyle && (gn = function(e) {
        return e.currentStyle
    }
    ,
    mn = function(e, t, n) {
        var i, r, a, o, s = e.style;
        return n = n || gn(e),
        o = n ? n[t] : void 0,
        null == o && s && s[t] && (o = s[t]),
        pn.test(o) && !bn.test(t) && (i = s.left,
        r = e.runtimeStyle,
        a = r && r.left,
        a && (r.left = e.currentStyle.left),
        s.left = "fontSize" === t ? "1em" : o,
        o = s.pixelLeft + "px",
        s.left = i,
        a && (r.left = a)),
        void 0 === o ? o : o + "" || "auto"
    }
    );
    var vn = /alpha\([^)]*\)/i
      , yn = /opacity\s*=\s*([^)]*)/i
      , _n = /^(none|table(?!-c[ea]).+)/
      , wn = new RegExp("^(" + Lt + ")(.*)$","i")
      , xn = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , kn = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , Cn = ["Webkit", "O", "Moz", "ms"]
      , Tn = it.createElement("div").style;
    ht.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = mn(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": dt.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, a, o, s = ht.camelCase(t), l = e.style;
                if (t = ht.cssProps[s] || (ht.cssProps[s] = M(s) || s),
                o = ht.cssHooks[t] || ht.cssHooks[s],
                void 0 === n)
                    return o && "get"in o && void 0 !== (r = o.get(e, !1, i)) ? r : l[t];
                if (a = typeof n,
                "string" === a && (r = zt.exec(n)) && r[1] && (n = p(e, t, r),
                a = "number"),
                null != n && n === n && ("number" === a && (n += r && r[3] || (ht.cssNumber[s] ? "" : "px")),
                dt.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                !(o && "set"in o && void 0 === (n = o.set(e, n, i)))))
                    try {
                        l[t] = n
                    } catch (c) {}
            }
        },
        css: function(e, t, n, i) {
            var r, a, o, s = ht.camelCase(t);
            return t = ht.cssProps[s] || (ht.cssProps[s] = M(s) || s),
            o = ht.cssHooks[t] || ht.cssHooks[s],
            o && "get"in o && (a = o.get(e, !0, n)),
            void 0 === a && (a = mn(e, t, i)),
            "normal" === a && t in kn && (a = kn[t]),
            "" === n || n ? (r = parseFloat(a),
            n === !0 || isFinite(r) ? r || 0 : a) : a
        }
    }),
    ht.each(["height", "width"], function(e, t) {
        ht.cssHooks[t] = {
            get: function(e, n, i) {
                return n ? _n.test(ht.css(e, "display")) && 0 === e.offsetWidth ? hn(e, xn, function() {
                    return z(e, t, i)
                }) : z(e, t, i) : void 0
            },
            set: function(e, n, i) {
                var r = i && gn(e);
                return I(e, n, i ? L(e, t, i, dt.boxSizing && "border-box" === ht.css(e, "boxSizing", !1, r), r) : 0)
            }
        }
    }),
    dt.opacity || (ht.cssHooks.opacity = {
        get: function(e, t) {
            return yn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style
              , i = e.currentStyle
              , r = ht.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
              , a = i && i.filter || n.filter || "";
            n.zoom = 1,
            (t >= 1 || "" === t) && "" === ht.trim(a.replace(vn, "")) && n.removeAttribute && (n.removeAttribute("filter"),
            "" === t || i && !i.filter) || (n.filter = vn.test(a) ? a.replace(vn, r) : a + " " + r)
        }
    }),
    ht.cssHooks.marginRight = A(dt.reliableMarginRight, function(e, t) {
        return t ? hn(e, {
            display: "inline-block"
        }, mn, [e, "marginRight"]) : void 0
    }),
    ht.cssHooks.marginLeft = A(dt.reliableMarginLeft, function(e, t) {
        return t ? (parseFloat(mn(e, "marginLeft")) || (ht.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - hn(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        }) : 0)) + "px" : void 0
    }),
    ht.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        ht.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, r = {}, a = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++)
                    r[e + Rt[i] + t] = a[i] || a[i - 2] || a[0];
                return r
            }
        },
        dn.test(e) || (ht.cssHooks[e + t].set = I)
    }),
    ht.fn.extend({
        css: function(e, t) {
            return qt(this, function(e, t, n) {
                var i, r, a = {}, o = 0;
                if (ht.isArray(t)) {
                    for (i = gn(e),
                    r = t.length; r > o; o++)
                        a[t[o]] = ht.css(e, t[o], !1, i);
                    return a
                }
                return void 0 !== n ? ht.style(e, t, n) : ht.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return j(this, !0)
        },
        hide: function() {
            return j(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Ot(this) ? ht(this).show() : ht(this).hide()
            })
        }
    }),
    ht.Tween = R,
    R.prototype = {
        constructor: R,
        init: function(e, t, n, i, r, a) {
            this.elem = e,
            this.prop = n,
            this.easing = r || ht.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = i,
            this.unit = a || (ht.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = R.propHooks[this.prop];
            return e && e.get ? e.get(this) : R.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = R.propHooks[this.prop];
            return this.pos = t = this.options.duration ? ht.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : R.propHooks._default.set(this),
            this
        }
    },
    R.prototype.init.prototype = R.prototype,
    R.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = ht.css(e.elem, e.prop, ""),
                t && "auto" !== t ? t : 0)
            },
            set: function(e) {
                ht.fx.step[e.prop] ? ht.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[ht.cssProps[e.prop]] && !ht.cssHooks[e.prop] ? e.elem[e.prop] = e.now : ht.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    },
    R.propHooks.scrollTop = R.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    ht.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    ht.fx = R.prototype.init,
    ht.fx.step = {};
    var Nn, En, Dn = /^(?:toggle|show|hide)$/, $n = /queueHooks$/;
    ht.Animation = ht.extend(H, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return p(n.elem, e, zt.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            ht.isFunction(e) ? (t = e,
            e = ["*"]) : e = e.match($t);
            for (var n, i = 0, r = e.length; r > i; i++)
                n = e[i],
                H.tweeners[n] = H.tweeners[n] || [],
                H.tweeners[n].unshift(t)
        },
        prefilters: [B],
        prefilter: function(e, t) {
            t ? H.prefilters.unshift(e) : H.prefilters.push(e)
        }
    }),
    ht.speed = function(e, t, n) {
        var i = e && "object" == typeof e ? ht.extend({}, e) : {
            complete: n || !n && t || ht.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !ht.isFunction(t) && t
        };
        return i.duration = ht.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ht.fx.speeds ? ht.fx.speeds[i.duration] : ht.fx.speeds._default,
        (null == i.queue || i.queue === !0) && (i.queue = "fx"),
        i.old = i.complete,
        i.complete = function() {
            ht.isFunction(i.old) && i.old.call(this),
            i.queue && ht.dequeue(this, i.queue)
        }
        ,
        i
    }
    ,
    ht.fn.extend({
        fadeTo: function(e, t, n, i) {
            return this.filter(Ot).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, i)
        },
        animate: function(e, t, n, i) {
            var r = ht.isEmptyObject(e)
              , a = ht.speed(t, n, i)
              , o = function() {
                var t = H(this, ht.extend({}, e), a);
                (r || ht._data(this, "finish")) && t.stop(!0)
            };
            return o.finish = o,
            r || a.queue === !1 ? this.each(o) : this.queue(a.queue, o)
        },
        stop: function(e, t, n) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            };
            return "string" != typeof e && (n = t,
            t = e,
            e = void 0),
            t && e !== !1 && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0
                  , r = null != e && e + "queueHooks"
                  , a = ht.timers
                  , o = ht._data(this);
                if (r)
                    o[r] && o[r].stop && i(o[r]);
                else
                    for (r in o)
                        o[r] && o[r].stop && $n.test(r) && i(o[r]);
                for (r = a.length; r--; )
                    a[r].elem !== this || null != e && a[r].queue !== e || (a[r].anim.stop(n),
                    t = !1,
                    a.splice(r, 1));
                (t || !n) && ht.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"),
            this.each(function() {
                var t, n = ht._data(this), i = n[e + "queue"], r = n[e + "queueHooks"], a = ht.timers, o = i ? i.length : 0;
                for (n.finish = !0,
                ht.queue(this, e, []),
                r && r.stop && r.stop.call(this, !0),
                t = a.length; t--; )
                    a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0),
                    a.splice(t, 1));
                for (t = 0; o > t; t++)
                    i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    ht.each(["toggle", "show", "hide"], function(e, t) {
        var n = ht.fn[t];
        ht.fn[t] = function(e, i, r) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(q(t, !0), e, i, r)
        }
    }),
    ht.each({
        slideDown: q("show"),
        slideUp: q("hide"),
        slideToggle: q("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        ht.fn[e] = function(e, n, i) {
            return this.animate(t, e, n, i)
        }
    }),
    ht.timers = [],
    ht.fx.tick = function() {
        var e, t = ht.timers, n = 0;
        for (Nn = ht.now(); n < t.length; n++)
            e = t[n],
            e() || t[n] !== e || t.splice(n--, 1);
        t.length || ht.fx.stop(),
        Nn = void 0
    }
    ,
    ht.fx.timer = function(e) {
        ht.timers.push(e),
        e() ? ht.fx.start() : ht.timers.pop()
    }
    ,
    ht.fx.interval = 13,
    ht.fx.start = function() {
        En || (En = e.setInterval(ht.fx.tick, ht.fx.interval))
    }
    ,
    ht.fx.stop = function() {
        e.clearInterval(En),
        En = null
    }
    ,
    ht.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    ht.fn.delay = function(t, n) {
        return t = ht.fx ? ht.fx.speeds[t] || t : t,
        n = n || "fx",
        this.queue(n, function(n, i) {
            var r = e.setTimeout(n, t);
            i.stop = function() {
                e.clearTimeout(r)
            }
        })
    }
    ,
    function() {
        var e, t = it.createElement("input"), n = it.createElement("div"), i = it.createElement("select"), r = i.appendChild(it.createElement("option"));
        n = it.createElement("div"),
        n.setAttribute("className", "t"),
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        e = n.getElementsByTagName("a")[0],
        t.setAttribute("type", "checkbox"),
        n.appendChild(t),
        e = n.getElementsByTagName("a")[0],
        e.style.cssText = "top:1px",
        dt.getSetAttribute = "t" !== n.className,
        dt.style = /top/.test(e.getAttribute("style")),
        dt.hrefNormalized = "/a" === e.getAttribute("href"),
        dt.checkOn = !!t.value,
        dt.optSelected = r.selected,
        dt.enctype = !!it.createElement("form").enctype,
        i.disabled = !0,
        dt.optDisabled = !r.disabled,
        t = it.createElement("input"),
        t.setAttribute("value", ""),
        dt.input = "" === t.getAttribute("value"),
        t.value = "t",
        t.setAttribute("type", "radio"),
        dt.radioValue = "t" === t.value
    }();
    var Sn = /\r/g
      , An = /[\x20\t\r\n\f]+/g;
    ht.fn.extend({
        val: function(e) {
            var t, n, i, r = this[0];
            {
                if (arguments.length)
                    return i = ht.isFunction(e),
                    this.each(function(n) {
                        var r;
                        1 === this.nodeType && (r = i ? e.call(this, n, ht(this).val()) : e,
                        null == r ? r = "" : "number" == typeof r ? r += "" : ht.isArray(r) && (r = ht.map(r, function(e) {
                            return null == e ? "" : e + ""
                        })),
                        t = ht.valHooks[this.type] || ht.valHooks[this.nodeName.toLowerCase()],
                        t && "set"in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                    });
                if (r)
                    return t = ht.valHooks[r.type] || ht.valHooks[r.nodeName.toLowerCase()],
                    t && "get"in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value,
                    "string" == typeof n ? n.replace(Sn, "") : null == n ? "" : n)
            }
        }
    }),
    ht.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = ht.find.attr(e, "value");
                    return null != t ? t : ht.trim(ht.text(e)).replace(An, " ")
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, r = e.selectedIndex, a = "select-one" === e.type || 0 > r, o = a ? null : [], s = a ? r + 1 : i.length, l = 0 > r ? s : a ? r : 0; s > l; l++)
                        if (n = i[l],
                        !(!n.selected && l !== r || (dt.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ht.nodeName(n.parentNode, "optgroup"))) {
                            if (t = ht(n).val(),
                            a)
                                return t;
                            o.push(t)
                        }
                    return o
                },
                set: function(e, t) {
                    for (var n, i, r = e.options, a = ht.makeArray(t), o = r.length; o--; )
                        if (i = r[o],
                        ht.inArray(ht.valHooks.option.get(i), a) > -1)
                            try {
                                i.selected = n = !0
                            } catch (s) {
                                i.scrollHeight
                            }
                        else
                            i.selected = !1;
                    return n || (e.selectedIndex = -1),
                    r
                }
            }
        }
    }),
    ht.each(["radio", "checkbox"], function() {
        ht.valHooks[this] = {
            set: function(e, t) {
                return ht.isArray(t) ? e.checked = ht.inArray(ht(e).val(), t) > -1 : void 0
            }
        },
        dt.checkOn || (ht.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    });
    var Mn, jn, In = ht.expr.attrHandle, Ln = /^(?:checked|selected)$/i, zn = dt.getSetAttribute, Rn = dt.input;
    ht.fn.extend({
        attr: function(e, t) {
            return qt(this, ht.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                ht.removeAttr(this, e)
            })
        }
    }),
    ht.extend({
        attr: function(e, t, n) {
            var i, r, a = e.nodeType;
            if (3 !== a && 8 !== a && 2 !== a)
                return "undefined" == typeof e.getAttribute ? ht.prop(e, t, n) : (1 === a && ht.isXMLDoc(e) || (t = t.toLowerCase(),
                r = ht.attrHooks[t] || (ht.expr.match.bool.test(t) ? jn : Mn)),
                void 0 !== n ? null === n ? void ht.removeAttr(e, t) : r && "set"in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""),
                n) : r && "get"in r && null !== (i = r.get(e, t)) ? i : (i = ht.find.attr(e, t),
                null == i ? void 0 : i))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!dt.radioValue && "radio" === t && ht.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i, r = 0, a = t && t.match($t);
            if (a && 1 === e.nodeType)
                for (; n = a[r++]; )
                    i = ht.propFix[n] || n,
                    ht.expr.match.bool.test(n) ? Rn && zn || !Ln.test(n) ? e[i] = !1 : e[ht.camelCase("default-" + n)] = e[i] = !1 : ht.attr(e, n, ""),
                    e.removeAttribute(zn ? n : i)
        }
    }),
    jn = {
        set: function(e, t, n) {
            return t === !1 ? ht.removeAttr(e, n) : Rn && zn || !Ln.test(n) ? e.setAttribute(!zn && ht.propFix[n] || n, n) : e[ht.camelCase("default-" + n)] = e[n] = !0,
            n
        }
    },
    ht.each(ht.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = In[t] || ht.find.attr;
        In[t] = Rn && zn || !Ln.test(t) ? function(e, t, i) {
            var r, a;
            return i || (a = In[t],
            In[t] = r,
            r = null != n(e, t, i) ? t.toLowerCase() : null,
            In[t] = a),
            r
        }
        : function(e, t, n) {
            return n ? void 0 : e[ht.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }),
    Rn && zn || (ht.attrHooks.value = {
        set: function(e, t, n) {
            return ht.nodeName(e, "input") ? void (e.defaultValue = t) : Mn && Mn.set(e, t, n)
        }
    }),
    zn || (Mn = {
        set: function(e, t, n) {
            var i = e.getAttributeNode(n);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)),
            i.value = t += "",
            "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    },
    In.id = In.name = In.coords = function(e, t, n) {
        var i;
        return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
    }
    ,
    ht.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        },
        set: Mn.set
    },
    ht.attrHooks.contenteditable = {
        set: function(e, t, n) {
            Mn.set(e, "" === t ? !1 : t, n)
        }
    },
    ht.each(["width", "height"], function(e, t) {
        ht.attrHooks[t] = {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"),
                n) : void 0
            }
        }
    })),
    dt.style || (ht.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var On = /^(?:input|select|textarea|button|object)$/i
      , qn = /^(?:a|area)$/i;
    ht.fn.extend({
        prop: function(e, t) {
            return qt(this, ht.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = ht.propFix[e] || e,
            this.each(function() {
                try {
                    this[e] = void 0,
                    delete this[e]
                } catch (t) {}
            })
        }
    }),
    ht.extend({
        prop: function(e, t, n) {
            var i, r, a = e.nodeType;
            if (3 !== a && 8 !== a && 2 !== a)
                return 1 === a && ht.isXMLDoc(e) || (t = ht.propFix[t] || t,
                r = ht.propHooks[t]),
                void 0 !== n ? r && "set"in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get"in r && null !== (i = r.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = ht.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : On.test(e.nodeName) || qn.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }),
    dt.hrefNormalized || ht.each(["href", "src"], function(e, t) {
        ht.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }),
    dt.optSelected || (ht.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex),
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    ht.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ht.propFix[this.toLowerCase()] = this
    }),
    dt.enctype || (ht.propFix.enctype = "encoding");
    var Fn = /[\t\r\n\f]/g;
    ht.fn.extend({
        addClass: function(e) {
            var t, n, i, r, a, o, s, l = 0;
            if (ht.isFunction(e))
                return this.each(function(t) {
                    ht(this).addClass(e.call(this, t, P(this)))
                });
            if ("string" == typeof e && e)
                for (t = e.match($t) || []; n = this[l++]; )
                    if (r = P(n),
                    i = 1 === n.nodeType && (" " + r + " ").replace(Fn, " ")) {
                        for (o = 0; a = t[o++]; )
                            i.indexOf(" " + a + " ") < 0 && (i += a + " ");
                        s = ht.trim(i),
                        r !== s && ht.attr(n, "class", s)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, r, a, o, s, l = 0;
            if (ht.isFunction(e))
                return this.each(function(t) {
                    ht(this).removeClass(e.call(this, t, P(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match($t) || []; n = this[l++]; )
                    if (r = P(n),
                    i = 1 === n.nodeType && (" " + r + " ").replace(Fn, " ")) {
                        for (o = 0; a = t[o++]; )
                            for (; i.indexOf(" " + a + " ") > -1; )
                                i = i.replace(" " + a + " ", " ");
                        s = ht.trim(i),
                        r !== s && ht.attr(n, "class", s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ht.isFunction(e) ? function(n) {
                ht(this).toggleClass(e.call(this, n, P(this), t), t)
            }
            : function() {
                var t, i, r, a;
                if ("string" === n)
                    for (i = 0,
                    r = ht(this),
                    a = e.match($t) || []; t = a[i++]; )
                        r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                else
                    (void 0 === e || "boolean" === n) && (t = P(this),
                    t && ht._data(this, "__className__", t),
                    ht.attr(this, "class", t || e === !1 ? "" : ht._data(this, "__className__") || ""))
            }
            )
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++]; )
                if (1 === n.nodeType && (" " + P(n) + " ").replace(Fn, " ").indexOf(t) > -1)
                    return !0;
            return !1
        }
    }),
    ht.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        ht.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }),
    ht.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    var Bn = e.location
      , Un = ht.now()
      , Hn = /\?/
      , Pn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ht.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse)
            return e.JSON.parse(t + "");
        var n, i = null, r = ht.trim(t + "");
        return r && !ht.trim(r.replace(Pn, function(e, t, r, a) {
            return n && t && (i = 0),
            0 === i ? e : (n = r || t,
            i += !a - !r,
            "")
        })) ? Function("return " + r)() : ht.error("Invalid JSON: " + t)
    }
    ,
    ht.parseXML = function(t) {
        var n, i;
        if (!t || "string" != typeof t)
            return null;
        try {
            e.DOMParser ? (i = new e.DOMParser,
            n = i.parseFromString(t, "text/xml")) : (n = new e.ActiveXObject("Microsoft.XMLDOM"),
            n.async = "false",
            n.loadXML(t))
        } catch (r) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ht.error("Invalid XML: " + t),
        n
    }
    ;
    var Wn = /#.*$/
      , Kn = /([?&])_=[^&]*/
      , Vn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm
      , Yn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , Zn = /^(?:GET|HEAD)$/
      , Qn = /^\/\//
      , Xn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
      , Gn = {}
      , Jn = {}
      , ei = "*/".concat("*")
      , ti = Bn.href
      , ni = Xn.exec(ti.toLowerCase()) || [];
    ht.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ti,
            type: "GET",
            isLocal: Yn.test(ni[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": ei,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ht.parseJSON,
                "text xml": ht.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? V(V(e, ht.ajaxSettings), t) : V(ht.ajaxSettings, e)
        },
        ajaxPrefilter: W(Gn),
        ajaxTransport: W(Jn),
        ajax: function(t, n) {
            function i(t, n, i, r) {
                var a, d, v, y, w, k = n;
                2 !== _ && (_ = 2,
                l && e.clearTimeout(l),
                u = void 0,
                s = r || "",
                x.readyState = t > 0 ? 4 : 0,
                a = t >= 200 && 300 > t || 304 === t,
                i && (y = Y(p, x, i)),
                y = Z(p, y, x, a),
                a ? (p.ifModified && (w = x.getResponseHeader("Last-Modified"),
                w && (ht.lastModified[o] = w),
                w = x.getResponseHeader("etag"),
                w && (ht.etag[o] = w)),
                204 === t || "HEAD" === p.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = y.state,
                d = y.data,
                v = y.error,
                a = !v)) : (v = k,
                (t || !k) && (k = "error",
                0 > t && (t = 0))),
                x.status = t,
                x.statusText = (n || k) + "",
                a ? g.resolveWith(h, [d, k, x]) : g.rejectWith(h, [x, k, v]),
                x.statusCode(b),
                b = void 0,
                c && f.trigger(a ? "ajaxSuccess" : "ajaxError", [x, p, a ? d : v]),
                m.fireWith(h, [x, k]),
                c && (f.trigger("ajaxComplete", [x, p]),
                --ht.active || ht.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t,
            t = void 0),
            n = n || {};
            var r, a, o, s, l, c, u, d, p = ht.ajaxSetup({}, n), h = p.context || p, f = p.context && (h.nodeType || h.jquery) ? ht(h) : ht.event, g = ht.Deferred(), m = ht.Callbacks("once memory"), b = p.statusCode || {}, v = {}, y = {}, _ = 0, w = "canceled", x = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === _) {
                        if (!d)
                            for (d = {}; t = Vn.exec(s); )
                                d[t[1].toLowerCase()] = t[2];
                        t = d[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function() {
                    return 2 === _ ? s : null
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return _ || (e = y[n] = y[n] || e,
                    v[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return _ || (p.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (2 > _)
                            for (t in e)
                                b[t] = [b[t], e[t]];
                        else
                            x.always(e[x.status]);
                    return this
                },
                abort: function(e) {
                    var t = e || w;
                    return u && u.abort(t),
                    i(0, t),
                    this
                }
            };
            if (g.promise(x).complete = m.add,
            x.success = x.done,
            x.error = x.fail,
            p.url = ((t || p.url || ti) + "").replace(Wn, "").replace(Qn, ni[1] + "//"),
            p.type = n.method || n.type || p.method || p.type,
            p.dataTypes = ht.trim(p.dataType || "*").toLowerCase().match($t) || [""],
            null == p.crossDomain && (r = Xn.exec(p.url.toLowerCase()),
            p.crossDomain = !(!r || r[1] === ni[1] && r[2] === ni[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (ni[3] || ("http:" === ni[1] ? "80" : "443")))),
            p.data && p.processData && "string" != typeof p.data && (p.data = ht.param(p.data, p.traditional)),
            K(Gn, p, n, x),
            2 === _)
                return x;
            c = ht.event && p.global,
            c && 0 === ht.active++ && ht.event.trigger("ajaxStart"),
            p.type = p.type.toUpperCase(),
            p.hasContent = !Zn.test(p.type),
            o = p.url,
            p.hasContent || (p.data && (o = p.url += (Hn.test(o) ? "&" : "?") + p.data,
            delete p.data),
            p.cache === !1 && (p.url = Kn.test(o) ? o.replace(Kn, "$1_=" + Un++) : o + (Hn.test(o) ? "&" : "?") + "_=" + Un++)),
            p.ifModified && (ht.lastModified[o] && x.setRequestHeader("If-Modified-Since", ht.lastModified[o]),
            ht.etag[o] && x.setRequestHeader("If-None-Match", ht.etag[o])),
            (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", p.contentType),
            x.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + ei + "; q=0.01" : "") : p.accepts["*"]);
            for (a in p.headers)
                x.setRequestHeader(a, p.headers[a]);
            if (p.beforeSend && (p.beforeSend.call(h, x, p) === !1 || 2 === _))
                return x.abort();
            w = "abort";
            for (a in {
                success: 1,
                error: 1,
                complete: 1
            })
                x[a](p[a]);
            if (u = K(Jn, p, n, x)) {
                if (x.readyState = 1,
                c && f.trigger("ajaxSend", [x, p]),
                2 === _)
                    return x;
                p.async && p.timeout > 0 && (l = e.setTimeout(function() {
                    x.abort("timeout")
                }, p.timeout));
                try {
                    _ = 1,
                    u.send(v, i)
                } catch (k) {
                    if (!(2 > _))
                        throw k;
                    i(-1, k)
                }
            } else
                i(-1, "No Transport");
            return x
        },
        getJSON: function(e, t, n) {
            return ht.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return ht.get(e, void 0, t, "script")
        }
    }),
    ht.each(["get", "post"], function(e, t) {
        ht[t] = function(e, n, i, r) {
            return ht.isFunction(n) && (r = r || i,
            i = n,
            n = void 0),
            ht.ajax(ht.extend({
                url: e,
                type: t,
                dataType: r,
                data: n,
                success: i
            }, ht.isPlainObject(e) && e))
        }
    }),
    ht._evalUrl = function(e) {
        return ht.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    ht.fn.extend({
        wrapAll: function(e) {
            if (ht.isFunction(e))
                return this.each(function(t) {
                    ht(this).wrapAll(e.call(this, t))
                });
            if (this[0]) {
                var t = ht(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; )
                        e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return this.each(ht.isFunction(e) ? function(t) {
                ht(this).wrapInner(e.call(this, t))
            }
            : function() {
                var t = ht(this)
                  , n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            }
            )
        },
        wrap: function(e) {
            var t = ht.isFunction(e);
            return this.each(function(n) {
                ht(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ht.nodeName(this, "body") || ht(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    ht.expr.filters.hidden = function(e) {
        return dt.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : X(e)
    }
    ,
    ht.expr.filters.visible = function(e) {
        return !ht.expr.filters.hidden(e)
    }
    ;
    var ii = /%20/g
      , ri = /\[\]$/
      , ai = /\r?\n/g
      , oi = /^(?:submit|button|image|reset|file)$/i
      , si = /^(?:input|select|textarea|keygen)/i;
    ht.param = function(e, t) {
        var n, i = [], r = function(e, t) {
            t = ht.isFunction(t) ? t() : null == t ? "" : t,
            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = ht.ajaxSettings && ht.ajaxSettings.traditional),
        ht.isArray(e) || e.jquery && !ht.isPlainObject(e))
            ht.each(e, function() {
                r(this.name, this.value)
            });
        else
            for (n in e)
                G(n, e[n], t, r);
        return i.join("&").replace(ii, "+")
    }
    ,
    ht.fn.extend({
        serialize: function() {
            return ht.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = ht.prop(this, "elements");
                return e ? ht.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !ht(this).is(":disabled") && si.test(this.nodeName) && !oi.test(e) && (this.checked || !Ft.test(e))
            }).map(function(e, t) {
                var n = ht(this).val();
                return null == n ? null : ht.isArray(n) ? ht.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(ai, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(ai, "\r\n")
                }
            }).get()
        }
    }),
    ht.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
        return this.isLocal ? et() : it.documentMode > 8 ? J() : /^(get|post|head|put|delete|options)$/i.test(this.type) && J() || et()
    }
    : J;
    var li = 0
      , ci = {}
      , ui = ht.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function() {
        for (var e in ci)
            ci[e](void 0, !0)
    }),
    dt.cors = !!ui && "withCredentials"in ui,
    ui = dt.ajax = !!ui,
    ui && ht.ajaxTransport(function(t) {
        if (!t.crossDomain || dt.cors) {
            var n;
            return {
                send: function(i, r) {
                    var a, o = t.xhr(), s = ++li;
                    if (o.open(t.type, t.url, t.async, t.username, t.password),
                    t.xhrFields)
                        for (a in t.xhrFields)
                            o[a] = t.xhrFields[a];
                    t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType),
                    t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (a in i)
                        void 0 !== i[a] && o.setRequestHeader(a, i[a] + "");
                    o.send(t.hasContent && t.data || null),
                    n = function(e, i) {
                        var a, l, c;
                        if (n && (i || 4 === o.readyState))
                            if (delete ci[s],
                            n = void 0,
                            o.onreadystatechange = ht.noop,
                            i)
                                4 !== o.readyState && o.abort();
                            else {
                                c = {},
                                a = o.status,
                                "string" == typeof o.responseText && (c.text = o.responseText);
                                try {
                                    l = o.statusText
                                } catch (u) {
                                    l = ""
                                }
                                a || !t.isLocal || t.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
                            }
                        c && r(a, l, c, o.getAllResponseHeaders())
                    }
                    ,
                    t.async ? 4 === o.readyState ? e.setTimeout(n) : o.onreadystatechange = ci[s] = n : n()
                },
                abort: function() {
                    n && n(void 0, !0)
                }
            }
        }
    }),
    ht.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return ht.globalEval(e),
                e
            }
        }
    }),
    ht.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET",
        e.global = !1)
    }),
    ht.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n = it.head || ht("head")[0] || it.documentElement;
            return {
                send: function(i, r) {
                    t = it.createElement("script"),
                    t.async = !0,
                    e.scriptCharset && (t.charset = e.scriptCharset),
                    t.src = e.url,
                    t.onload = t.onreadystatechange = function(e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null,
                        t.parentNode && t.parentNode.removeChild(t),
                        t = null,
                        n || r(200, "success"))
                    }
                    ,
                    n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var di = []
      , pi = /(=)\?(?=&|$)|\?\?/;
    ht.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = di.pop() || ht.expando + "_" + Un++;
            return this[e] = !0,
            e
        }
    }),
    ht.ajaxPrefilter("json jsonp", function(t, n, i) {
        var r, a, o, s = t.jsonp !== !1 && (pi.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && pi.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = ht.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
        s ? t[s] = t[s].replace(pi, "$1" + r) : t.jsonp !== !1 && (t.url += (Hn.test(t.url) ? "&" : "?") + t.jsonp + "=" + r),
        t.converters["script json"] = function() {
            return o || ht.error(r + " was not called"),
            o[0]
        }
        ,
        t.dataTypes[0] = "json",
        a = e[r],
        e[r] = function() {
            o = arguments
        }
        ,
        i.always(function() {
            void 0 === a ? ht(e).removeProp(r) : e[r] = a,
            t[r] && (t.jsonpCallback = n.jsonpCallback,
            di.push(r)),
            o && ht.isFunction(a) && a(o[0]),
            o = a = void 0
        }),
        "script") : void 0
    }),
    ht.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e)
            return null;
        "boolean" == typeof t && (n = t,
        t = !1),
        t = t || it;
        var i = xt.exec(e)
          , r = !n && [];
        return i ? [t.createElement(i[1])] : (i = b([e], t, r),
        r && r.length && ht(r).remove(),
        ht.merge([], i.childNodes))
    }
    ;
    var hi = ht.fn.load;
    ht.fn.load = function(e, t, n) {
        if ("string" != typeof e && hi)
            return hi.apply(this, arguments);
        var i, r, a, o = this, s = e.indexOf(" ");
        return s > -1 && (i = ht.trim(e.slice(s, e.length)),
        e = e.slice(0, s)),
        ht.isFunction(t) ? (n = t,
        t = void 0) : t && "object" == typeof t && (r = "POST"),
        o.length > 0 && ht.ajax({
            url: e,
            type: r || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            a = arguments,
            o.html(i ? ht("<div>").append(ht.parseHTML(e)).find(i) : e)
        }).always(n && function(e, t) {
            o.each(function() {
                n.apply(this, a || [e.responseText, t, e])
            })
        }
        ),
        this
    }
    ,
    ht.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        ht.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    ht.expr.filters.animated = function(e) {
        return ht.grep(ht.timers, function(t) {
            return e === t.elem
        }).length
    }
    ,
    ht.offset = {
        setOffset: function(e, t, n) {
            var i, r, a, o, s, l, c, u = ht.css(e, "position"), d = ht(e), p = {};
            "static" === u && (e.style.position = "relative"),
            s = d.offset(),
            a = ht.css(e, "top"),
            l = ht.css(e, "left"),
            c = ("absolute" === u || "fixed" === u) && ht.inArray("auto", [a, l]) > -1,
            c ? (i = d.position(),
            o = i.top,
            r = i.left) : (o = parseFloat(a) || 0,
            r = parseFloat(l) || 0),
            ht.isFunction(t) && (t = t.call(e, n, ht.extend({}, s))),
            null != t.top && (p.top = t.top - s.top + o),
            null != t.left && (p.left = t.left - s.left + r),
            "using"in t ? t.using.call(e, p) : d.css(p)
        }
    },
    ht.fn.extend({
        offset: function(e) {
            if (arguments.length)
                return void 0 === e ? this : this.each(function(t) {
                    ht.offset.setOffset(this, e, t)
                });
            var t, n, i = {
                top: 0,
                left: 0
            }, r = this[0], a = r && r.ownerDocument;
            if (a)
                return t = a.documentElement,
                ht.contains(t, r) ? ("undefined" != typeof r.getBoundingClientRect && (i = r.getBoundingClientRect()),
                n = tt(a),
                {
                    top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                    left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                }) : i
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                }, i = this[0];
                return "fixed" === ht.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(),
                t = this.offset(),
                ht.nodeName(e[0], "html") || (n = e.offset()),
                n.top += ht.css(e[0], "borderTopWidth", !0),
                n.left += ht.css(e[0], "borderLeftWidth", !0)),
                {
                    top: t.top - n.top - ht.css(i, "marginTop", !0),
                    left: t.left - n.left - ht.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && !ht.nodeName(e, "html") && "static" === ht.css(e, "position"); )
                    e = e.offsetParent;
                return e || fn
            })
        }
    }),
    ht.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = /Y/.test(t);
        ht.fn[e] = function(i) {
            return qt(this, function(e, i, r) {
                var a = tt(e);
                return void 0 === r ? a ? t in a ? a[t] : a.document.documentElement[i] : e[i] : void (a ? a.scrollTo(n ? ht(a).scrollLeft() : r, n ? r : ht(a).scrollTop()) : e[i] = r)
            }, e, i, arguments.length, null)
        }
    }),
    ht.each(["top", "left"], function(e, t) {
        ht.cssHooks[t] = A(dt.pixelPosition, function(e, n) {
            return n ? (n = mn(e, t),
            pn.test(n) ? ht(e).position()[t] + "px" : n) : void 0
        })
    }),
    ht.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        ht.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, i) {
            ht.fn[i] = function(i, r) {
                var a = arguments.length && (n || "boolean" != typeof i)
                  , o = n || (i === !0 || r === !0 ? "margin" : "border");
                return qt(this, function(t, n, i) {
                    var r;
                    return ht.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement,
                    Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? ht.css(t, n, o) : ht.style(t, n, i, o)
                }, t, a ? i : void 0, a, null)
            }
        })
    }),
    ht.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }),
    ht.fn.size = function() {
        return this.length
    }
    ,
    ht.fn.andSelf = ht.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return ht
    });
    var fi = e.jQuery
      , gi = e.$;
    return ht.noConflict = function(t) {
        return e.$ === ht && (e.$ = gi),
        t && e.jQuery === ht && (e.jQuery = fi),
        ht
    }
    ,
    t || (e.jQuery = e.$ = ht),
    ht
}),
function(e, t) {
    "use strict";
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var n, i = e(document);
    e.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[name][type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function() {
            return e("meta[name=csrf-token]").attr("content")
        },
        csrfParam: function() {
            return e("meta[name=csrf-param]").attr("content")
        },
        CSRFProtection: function(e) {
            var t = n.csrfToken();
            t && e.setRequestHeader("X-CSRF-Token", t)
        },
        refreshCSRFTokens: function() {
            e('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
        },
        fire: function(t, n, i) {
            var r = e.Event(n);
            return t.trigger(r, i),
            r.result !== !1
        },
        confirm: function(e) {
            return confirm(e)
        },
        ajax: function(t) {
            return e.ajax(t)
        },
        href: function(e) {
            return e[0].href
        },
        isRemote: function(e) {
            return e.data("remote") !== t && e.data("remote") !== !1
        },
        handleRemote: function(i) {
            var r, a, o, s, l, c;
            if (n.fire(i, "ajax:before")) {
                if (s = i.data("with-credentials") || null,
                l = i.data("type") || e.ajaxSettings && e.ajaxSettings.dataType,
                i.is("form")) {
                    r = i.data("ujs:submit-button-formmethod") || i.attr("method"),
                    a = i.data("ujs:submit-button-formaction") || i.attr("action"),
                    o = e(i[0]).serializeArray();
                    var u = i.data("ujs:submit-button");
                    u && (o.push(u),
                    i.data("ujs:submit-button", null)),
                    i.data("ujs:submit-button-formmethod", null),
                    i.data("ujs:submit-button-formaction", null)
                } else
                    i.is(n.inputChangeSelector) ? (r = i.data("method"),
                    a = i.data("url"),
                    o = i.serialize(),
                    i.data("params") && (o = o + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (r = i.data("method") || "get",
                    a = i.data("url"),
                    o = i.serialize(),
                    i.data("params") && (o = o + "&" + i.data("params"))) : (r = i.data("method"),
                    a = n.href(i),
                    o = i.data("params") || null);
                return c = {
                    type: r || "GET",
                    data: o,
                    dataType: l,
                    beforeSend: function(e, r) {
                        return r.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script),
                        n.fire(i, "ajax:beforeSend", [e, r]) ? void i.trigger("ajax:send", e) : !1
                    },
                    success: function(e, t, n) {
                        i.trigger("ajax:success", [e, t, n])
                    },
                    complete: function(e, t) {
                        i.trigger("ajax:complete", [e, t])
                    },
                    error: function(e, t, n) {
                        i.trigger("ajax:error", [e, t, n])
                    },
                    crossDomain: n.isCrossDomain(a)
                },
                s && (c.xhrFields = {
                    withCredentials: s
                }),
                a && (c.url = a),
                n.ajax(c)
            }
            return !1
        },
        isCrossDomain: function(e) {
            var t = document.createElement("a");
            t.href = location.href;
            var n = document.createElement("a");
            try {
                return n.href = e,
                n.href = n.href,
                !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
            } catch (i) {
                return !0
            }
        },
        handleMethod: function(i) {
            var r = n.href(i)
              , a = i.data("method")
              , o = i.attr("target")
              , s = n.csrfToken()
              , l = n.csrfParam()
              , c = e('<form method="post" action="' + r + '"></form>')
              , u = '<input name="_method" value="' + a + '" type="hidden" />';
            l === t || s === t || n.isCrossDomain(r) || (u += '<input name="' + l + '" value="' + s + '" type="hidden" />'),
            o && c.attr("target", o),
            c.hide().append(u).appendTo("body"),
            c.submit()
        },
        formElements: function(t, n) {
            return t.is("form") ? e(t[0].elements).filter(n) : t.find(n)
        },
        disableFormElements: function(t) {
            n.formElements(t, n.disableSelector).each(function() {
                n.disableFormElement(e(this))
            })
        },
        disableFormElement: function(e) {
            var n, i;
            n = e.is("button") ? "html" : "val",
            i = e.data("disable-with"),
            i !== t && (e.data("ujs:enable-with", e[n]()),
            e[n](i)),
            e.prop("disabled", !0),
            e.data("ujs:disabled", !0)
        },
        enableFormElements: function(t) {
            n.formElements(t, n.enableSelector).each(function() {
                n.enableFormElement(e(this))
            })
        },
        enableFormElement: function(e) {
            var n = e.is("button") ? "html" : "val";
            e.data("ujs:enable-with") !== t && (e[n](e.data("ujs:enable-with")),
            e.removeData("ujs:enable-with")),
            e.prop("disabled", !1),
            e.removeData("ujs:disabled")
        },
        allowAction: function(e) {
            var t, i = e.data("confirm"), r = !1;
            if (!i)
                return !0;
            if (n.fire(e, "confirm")) {
                try {
                    r = n.confirm(i)
                } catch (a) {
                    (console.error || console.log).call(console, a.stack || a)
                }
                t = n.fire(e, "confirm:complete", [r])
            }
            return r && t
        },
        blankInputs: function(t, n, i) {
            var r, a, o, s, l = e(), c = n || "input,textarea", u = t.find(c), d = {};
            return u.each(function() {
                r = e(this),
                r.is("input[type=radio]") ? (s = r.attr("name"),
                d[s] || (0 === t.find('input[type=radio]:checked[name="' + s + '"]').length && (o = t.find('input[type=radio][name="' + s + '"]'),
                l = l.add(o)),
                d[s] = s)) : (a = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") : !!r.val(),
                a === i && (l = l.add(r)))
            }),
            l.length ? l : !1
        },
        nonBlankInputs: function(e, t) {
            return n.blankInputs(e, t, !0)
        },
        stopEverything: function(t) {
            return e(t.target).trigger("ujs:everythingStopped"),
            t.stopImmediatePropagation(),
            !1
        },
        disableElement: function(e) {
            var i = e.data("disable-with");
            i !== t && (e.data("ujs:enable-with", e.html()),
            e.html(i)),
            e.bind("click.railsDisable", function(e) {
                return n.stopEverything(e)
            }),
            e.data("ujs:disabled", !0)
        },
        enableElement: function(e) {
            e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")),
            e.removeData("ujs:enable-with")),
            e.unbind("click.railsDisable"),
            e.removeData("ujs:disabled")
        }
    },
    n.fire(i, "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, i) {
        e.crossDomain || n.CSRFProtection(i)
    }),
    e(window).on("pageshow.rails", function() {
        e(e.rails.enableSelector).each(function() {
            var t = e(this);
            t.data("ujs:disabled") && e.rails.enableFormElement(t)
        }),
        e(e.rails.linkDisableSelector).each(function() {
            var t = e(this);
            t.data("ujs:disabled") && e.rails.enableElement(t)
        })
    }),
    i.on("ajax:complete", n.linkDisableSelector, function() {
        n.enableElement(e(this))
    }),
    i.on("ajax:complete", n.buttonDisableSelector, function() {
        n.enableFormElement(e(this))
    }),
    i.on("click.rails", n.linkClickSelector, function(t) {
        var i = e(this)
          , r = i.data("method")
          , a = i.data("params")
          , o = t.metaKey || t.ctrlKey;
        if (!n.allowAction(i))
            return n.stopEverything(t);
        if (!o && i.is(n.linkDisableSelector) && n.disableElement(i),
        n.isRemote(i)) {
            if (o && (!r || "GET" === r) && !a)
                return !0;
            var s = n.handleRemote(i);
            return s === !1 ? n.enableElement(i) : s.fail(function() {
                n.enableElement(i)
            }),
            !1
        }
        return r ? (n.handleMethod(i),
        !1) : void 0
    }),
    i.on("click.rails", n.buttonClickSelector, function(t) {
        var i = e(this);
        if (!n.allowAction(i) || !n.isRemote(i))
            return n.stopEverything(t);
        i.is(n.buttonDisableSelector) && n.disableFormElement(i);
        var r = n.handleRemote(i);
        return r === !1 ? n.enableFormElement(i) : r.fail(function() {
            n.enableFormElement(i)
        }),
        !1
    }),
    i.on("change.rails", n.inputChangeSelector, function(t) {
        var i = e(this);
        return n.allowAction(i) && n.isRemote(i) ? (n.handleRemote(i),
        !1) : n.stopEverything(t)
    }),
    i.on("submit.rails", n.formSubmitSelector, function(i) {
        var r, a, o = e(this), s = n.isRemote(o);
        if (!n.allowAction(o))
            return n.stopEverything(i);
        if (o.attr("novalidate") === t)
            if (o.data("ujs:formnovalidate-button") === t) {
                if (r = n.blankInputs(o, n.requiredInputSelector, !1),
                r && n.fire(o, "ajax:aborted:required", [r]))
                    return n.stopEverything(i)
            } else
                o.data("ujs:formnovalidate-button", t);
        if (s) {
            if (a = n.nonBlankInputs(o, n.fileInputSelector)) {
                setTimeout(function() {
                    n.disableFormElements(o)
                }, 13);
                var l = n.fire(o, "ajax:aborted:file", [a]);
                return l || setTimeout(function() {
                    n.enableFormElements(o)
                }, 13),
                l
            }
            return n.handleRemote(o),
            !1
        }
        setTimeout(function() {
            n.disableFormElements(o)
        }, 13)
    }),
    i.on("click.rails", n.formInputClickSelector, function(t) {
        var i = e(this);
        if (!n.allowAction(i))
            return n.stopEverything(t);
        var r = i.attr("name")
          , a = r ? {
            name: r,
            value: i.val()
        } : null
          , o = i.closest("form");
        0 === o.length && (o = e("#" + i.attr("form"))),
        o.data("ujs:submit-button", a),
        o.data("ujs:formnovalidate-button", i.attr("formnovalidate")),
        o.data("ujs:submit-button-formaction", i.attr("formaction")),
        o.data("ujs:submit-button-formmethod", i.attr("formmethod"))
    }),
    i.on("ajax:send.rails", n.formSubmitSelector, function(t) {
        this === t.target && n.disableFormElements(e(this))
    }),
    i.on("ajax:complete.rails", n.formSubmitSelector, function(t) {
        this === t.target && n.enableFormElements(e(this))
    }),
    e(function() {
        n.refreshCSRFTokens()
    }))
}(jQuery),
function(e) {
    function t(e, t) {
        return "function" == typeof e ? e.call(t) : e
    }
    function n(e) {
        for (; e = e.parentNode; )
            if (e == document)
                return !0;
        return !1
    }
    function i(t, n) {
        this.$element = e(t),
        this.options = n,
        this.enabled = !0,
        this.fixTitle()
    }
    i.prototype = {
        show: function() {
            var n = this.getTitle();
            if (n && this.enabled) {
                var i = this.tip();
                i.find(".tipsy-inner")[this.options.html ? "html" : "text"](n),
                i[0].className = "tipsy",
                i.remove().css({
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    display: "block"
                }).prependTo(document.body);
                var r, a = e.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                }), o = i[0].offsetWidth, s = i[0].offsetHeight, l = t(this.options.gravity, this.$element[0]);
                switch (l.charAt(0)) {
                case "n":
                    r = {
                        top: a.top + a.height + this.options.offset,
                        left: a.left + a.width / 2 - o / 2
                    };
                    break;
                case "s":
                    r = {
                        top: a.top - s - this.options.offset,
                        left: a.left + a.width / 2 - o / 2
                    };
                    break;
                case "e":
                    r = {
                        top: a.top + a.height / 2 - s / 2,
                        left: a.left - o - this.options.offset
                    };
                    break;
                case "w":
                    r = {
                        top: a.top + a.height / 2 - s / 2,
                        left: a.left + a.width + this.options.offset
                    }
                }
                2 == l.length && (r.left = "w" == l.charAt(1) ? a.left + a.width / 2 - 15 : a.left + a.width / 2 - o + 15),
                i.css(r).addClass("tipsy-" + l),
                i.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + l.charAt(0),
                this.options.className && i.addClass(t(this.options.className, this.$element[0])),
                this.options.fade ? i.stop().css({
                    opacity: 0,
                    display: "block",
                    visibility: "visible"
                }).animate({
                    opacity: this.options.opacity
                }) : i.css({
                    visibility: "visible",
                    opacity: this.options.opacity
                })
            }
        },
        hide: function() {
            this.options.fade ? this.tip().stop().fadeOut(function() {
                e(this).remove()
            }) : this.tip().remove()
        },
        fixTitle: function() {
            var e = this.$element;
            (e.attr("title") || "string" != typeof e.attr("original-title")) && e.attr("original-title", e.attr("title") || "").removeAttr("title")
        },
        getTitle: function() {
            var e, t = this.$element, n = this.options;
            this.fixTitle();
            var e, n = this.options;
            return "string" == typeof n.title ? e = t.attr("title" == n.title ? "original-title" : n.title) : "function" == typeof n.title && (e = n.title.call(t[0])),
            e = ("" + e).replace(/(^\s*|\s*$)/, ""),
            e || n.fallback
        },
        tip: function() {
            return this.$tip || (this.$tip = e('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'),
            this.$tip.data("tipsy-pointee", this.$element[0])),
            this.$tip
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(),
            this.$element = null,
            this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        }
    },
    e.fn.tipsy = function(t) {
        function n(n) {
            var r = e.data(n, "tipsy");
            return r || (r = new i(n,e.fn.tipsy.elementOptions(n, t)),
            e.data(n, "tipsy", r)),
            r
        }
        function r() {
            var e = n(this);
            e.hoverState = "in",
            0 == t.delayIn ? e.show() : (e.fixTitle(),
            setTimeout(function() {
                "in" == e.hoverState && e.show()
            }, t.delayIn))
        }
        function a() {
            var e = n(this);
            e.hoverState = "out",
            0 == t.delayOut ? e.hide() : setTimeout(function() {
                "out" == e.hoverState && e.hide()
            }, t.delayOut)
        }
        if (t === !0)
            return this.data("tipsy");
        if ("string" == typeof t) {
            var o = this.data("tipsy");
            return o && o[t](),
            this
        }
        if (t = e.extend({}, e.fn.tipsy.defaults, t),
        t.live || this.each(function() {
            n(this)
        }),
        "manual" != t.trigger) {
            var s = t.live ? "live" : "bind"
              , l = "hover" == t.trigger ? "mouseenter" : "focus"
              , c = "hover" == t.trigger ? "mouseleave" : "blur";
            this[s](l, r)[s](c, a)
        }
        return this
    }
    ,
    e.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: !1,
        fallback: "",
        gravity: "n",
        html: !1,
        live: !1,
        offset: 0,
        opacity: .8,
        title: "title",
        trigger: "hover"
    },
    e.fn.tipsy.revalidate = function() {
        e(".tipsy").each(function() {
            var t = e.data(this, "tipsy-pointee");
            t && n(t) || e(this).remove()
        })
    }
    ,
    e.fn.tipsy.elementOptions = function(t, n) {
        return e.metadata ? e.extend({}, n, e(t).metadata()) : n
    }
    ,
    e.fn.tipsy.autoNS = function() {
        return e(this).offset().top > e(document).scrollTop() + e(window).height() / 2 ? "s" : "n"
    }
    ,
    e.fn.tipsy.autoWE = function() {
        return e(this).offset().left > e(document).scrollLeft() + e(window).width() / 2 ? "e" : "w"
    }
    ,
    e.fn.tipsy.autoBounds = function(t, n) {
        return function() {
            var i = {
                ns: n[0],
                ew: n.length > 1 ? n[1] : !1
            }
              , r = e(document).scrollTop() + t
              , a = e(document).scrollLeft() + t
              , o = e(this);
            return o.offset().top < r && (i.ns = "n"),
            o.offset().left < a && (i.ew = "w"),
            e(window).width() + e(document).scrollLeft() - o.offset().left < t && (i.ew = "e"),
            e(window).height() + e(document).scrollTop() - o.offset().top < t && (i.ns = "s"),
            i.ns + (i.ew ? i.ew : "")
        }
    }
}(jQuery),
function() {
    var e;
    e = null,
    function(t) {
        var n, i, r, a, o, s;
        return i = function() {
            return null != e ? e : t("#peek").data("request-id")
        }
        ,
        a = function() {
            return t("#peek").length
        }
        ,
        s = function(e) {
            var n, r;
            for (n in e.data)
                for (r in e.data[n])
                    t("[data-defer-to=" + n + "-" + r + "]").text(e.data[n][r]);
            return t(document).trigger("peek:render", [i(), e])
        }
        ,
        r = function() {
            return t("#peek .peek-tooltip, #peek .tooltip").each(function() {
                var e, n;
                return e = t(this),
                n = e.hasClass("rightwards") || e.hasClass("leftwards") ? t.fn.tipsy.autoWE : t.fn.tipsy.autoNS,
                e.tipsy({
                    gravity: n
                })
            })
        }
        ,
        o = function(e) {
            var n;
            if (!t(e.target).is(":input"))
                return 96 !== e.which || e.metaKey ? void 0 : (n = t("#peek"),
                n.hasClass("disabled") ? (n.removeClass("disabled"),
                document.cookie = "peek=true; path=/") : (n.addClass("disabled"),
                document.cookie = "peek=false; path=/"))
        }
        ,
        n = function() {
            return t.ajax("/peek/results", {
                data: {
                    request_id: i()
                },
                success: function(e) {
                    return s(e)
                },
                error: function() {}
            })
        }
        ,
        t(document).on("keypress", o),
        t(document).on("peek:update", r),
        t(document).on("peek:update", n),
        t(document).on("pjax:end", function(n, i) {
            return null != i && (e = i.getResponseHeader("X-Request-Id")),
            a() ? t(this).trigger("peek:update") : void 0
        }),
        t(document).on("page:change turbolinks:load", function() {
            return a() ? t(this).trigger("peek:update") : void 0
        }),
        t(function() {
            return a() ? t(this).trigger("peek:update") : void 0
        })
    }(jQuery)
}
.call(this),
$(document).on("click", ".js-lineprof-file", function(e) {
    return $(this).parents(".heading").next("div").toggle(),
    e.preventDefault(),
    !1
}),
"undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+function(e) {
    var t = e.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1)
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery),
+function(e) {
    "use strict";
    function t() {
        var e = document.createElement("bootstrap")
          , t = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var n in t)
            if (void 0 !== e.style[n])
                return {
                    end: t[n]
                };
        return !1
    }
    e.fn.emulateTransitionEnd = function(t) {
        var n = !1
          , i = this;
        e(this).one("bsTransitionEnd", function() {
            n = !0
        });
        var r = function() {
            n || e(i).trigger(e.support.transition.end)
        };
        return setTimeout(r, t),
        this
    }
    ,
    e(function() {
        e.support.transition = t(),
        e.support.transition && (e.event.special.bsTransitionEnd = {
            bindType: e.support.transition.end,
            delegateType: e.support.transition.end,
            handle: function(t) {
                return e(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery),
+function(e) {
    "use strict";
    function t(t) {
        return this.each(function() {
            var n = e(this)
              , r = n.data("bs.alert");
            r || n.data("bs.alert", r = new i(this)),
            "string" == typeof t && r[t].call(n)
        })
    }
    var n = '[data-dismiss="alert"]'
      , i = function(t) {
        e(t).on("click", n, this.close)
    };
    i.VERSION = "3.3.1",
    i.TRANSITION_DURATION = 150,
    i.prototype.close = function(t) {
        function n() {
            o.detach().trigger("closed.bs.alert").remove()
        }
        var r = e(this)
          , a = r.attr("data-target");
        a || (a = r.attr("href"),
        a = a && a.replace(/.*(?=#[^\s]*$)/, ""));
        var o = e(a);
        t && t.preventDefault(),
        o.length || (o = r.closest(".alert")),
        o.trigger(t = e.Event("close.bs.alert")),
        t.isDefaultPrevented() || (o.removeClass("in"),
        e.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
    }
    ;
    var r = e.fn.alert;
    e.fn.alert = t,
    e.fn.alert.Constructor = i,
    e.fn.alert.noConflict = function() {
        return e.fn.alert = r,
        this
    }
    ,
    e(document).on("click.bs.alert.data-api", n, i.prototype.close)
}(jQuery),
+function(e) {
    "use strict";
    function t(t) {
        return this.each(function() {
            var i = e(this)
              , r = i.data("bs.button")
              , a = "object" == typeof t && t;
            r || i.data("bs.button", r = new n(this,a)),
            "toggle" == t ? r.toggle() : t && r.setState(t)
        })
    }
    var n = function(t, i) {
        this.$element = e(t),
        this.options = e.extend({}, n.DEFAULTS, i),
        this.isLoading = !1
    };
    n.VERSION = "3.3.1",
    n.DEFAULTS = {
        loadingText: "loading..."
    },
    n.prototype.setState = function(t) {
        var n = "disabled"
          , i = this.$element
          , r = i.is("input") ? "val" : "html"
          , a = i.data();
        t += "Text",
        null == a.resetText && i.data("resetText", i[r]()),
        setTimeout(e.proxy(function() {
            i[r](null == a[t] ? this.options[t] : a[t]),
            "loadingText" == t ? (this.isLoading = !0,
            i.addClass(n).attr(n, n)) : this.isLoading && (this.isLoading = !1,
            i.removeClass(n).removeAttr(n))
        }, this), 0)
    }
    ,
    n.prototype.toggle = function() {
        var e = !0
          , t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? e = !1 : t.find(".active").removeClass("active")),
            e && n.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else
            this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        e && this.$element.toggleClass("active")
    }
    ;
    var i = e.fn.button;
    e.fn.button = t,
    e.fn.button.Constructor = n,
    e.fn.button.noConflict = function() {
        return e.fn.button = i,
        this
    }
    ,
    e(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(n) {
        var i = e(n.target);
        i.hasClass("btn") || (i = i.closest(".btn")),
        t.call(i, "toggle"),
        n.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        e(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    })
}(jQuery),
+function(e) {
    "use strict";
    function t(t) {
        return this.each(function() {
            var i = e(this)
              , r = i.data("bs.carousel")
              , a = e.extend({}, n.DEFAULTS, i.data(), "object" == typeof t && t)
              , o = "string" == typeof t ? t : a.slide;
            r || i.data("bs.carousel", r = new n(this,a)),
            "number" == typeof t ? r.to(t) : o ? r[o]() : a.interval && r.pause().cycle()
        })
    }
    var n = function(t, n) {
        this.$element = e(t),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = n,
        this.paused = this.sliding = this.interval = this.$active = this.$items = null,
        this.options.keyboard && this.$element.on("keydown.bs.carousel", e.proxy(this.keydown, this)),
        "hover" == this.options.pause && !("ontouchstart"in document.documentElement) && this.$element.on("mouseenter.bs.carousel", e.proxy(this.pause, this)).on("mouseleave.bs.carousel", e.proxy(this.cycle, this))
    };
    n.VERSION = "3.3.1",
    n.TRANSITION_DURATION = 600,
    n.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    },
    n.prototype.keydown = function(e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
            }
            e.preventDefault()
        }
    }
    ,
    n.prototype.cycle = function(t) {
        return t || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)),
        this
    }
    ,
    n.prototype.getItemIndex = function(e) {
        return this.$items = e.parent().children(".item"),
        this.$items.index(e || this.$active)
    }
    ,
    n.prototype.getItemForDirection = function(e, t) {
        var n = "prev" == e ? -1 : 1
          , i = this.getItemIndex(t)
          , r = (i + n) % this.$items.length;
        return this.$items.eq(r)
    }
    ,
    n.prototype.to = function(e) {
        var t = this
          , n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return e > this.$items.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            t.to(e)
        }) : n == e ? this.pause().cycle() : this.slide(e > n ? "next" : "prev", this.$items.eq(e))
    }
    ,
    n.prototype.pause = function(t) {
        return t || (this.paused = !0),
        this.$element.find(".next, .prev").length && e.support.transition && (this.$element.trigger(e.support.transition.end),
        this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    }
    ,
    n.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }
    ,
    n.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }
    ,
    n.prototype.slide = function(t, i) {
        var r = this.$element.find(".item.active")
          , a = i || this.getItemForDirection(t, r)
          , o = this.interval
          , s = "next" == t ? "left" : "right"
          , l = "next" == t ? "first" : "last"
          , c = this;
        if (!a.length) {
            if (!this.options.wrap)
                return;
            a = this.$element.find(".item")[l]()
        }
        if (a.hasClass("active"))
            return this.sliding = !1;
        var u = a[0]
          , d = e.Event("slide.bs.carousel", {
            relatedTarget: u,
            direction: s
        });
        if (this.$element.trigger(d),
        !d.isDefaultPrevented()) {
            if (this.sliding = !0,
            o && this.pause(),
            this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var p = e(this.$indicators.children()[this.getItemIndex(a)]);
                p && p.addClass("active")
            }
            var h = e.Event("slid.bs.carousel", {
                relatedTarget: u,
                direction: s
            });
            return e.support.transition && this.$element.hasClass("slide") ? (a.addClass(t),
            a[0].offsetWidth,
            r.addClass(s),
            a.addClass(s),
            r.one("bsTransitionEnd", function() {
                a.removeClass([t, s].join(" ")).addClass("active"),
                r.removeClass(["active", s].join(" ")),
                c.sliding = !1,
                setTimeout(function() {
                    c.$element.trigger(h)
                }, 0)
            }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (r.removeClass("active"),
            a.addClass("active"),
            this.sliding = !1,
            this.$element.trigger(h)),
            o && this.cycle(),
            this
        }
    }
    ;
    var i = e.fn.carousel;
    e.fn.carousel = t,
    e.fn.carousel.Constructor = n,
    e.fn.carousel.noConflict = function() {
        return e.fn.carousel = i,
        this
    }
    ;
    var r = function(n) {
        var i, r = e(this), a = e(r.attr("data-target") || (i = r.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        if (a.hasClass("carousel")) {
            var o = e.extend({}, a.data(), r.data())
              , s = r.attr("data-slide-to");
            s && (o.interval = !1),
            t.call(a, o),
            s && a.data("bs.carousel").to(s),
            n.preventDefault()
        }
    };
    e(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r),
    e(window).on("load", function() {
        e('[data-ride="carousel"]').each(function() {
            var n = e(this);
            t.call(n, n.data())
        })
    })
}(jQuery),
+function(e) {
    "use strict";
    function t(t) {
        var n, i = t.attr("data-target") || (n = t.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return e(i)
    }
    function n(t) {
        return this.each(function() {
            var n = e(this)
              , r = n.data("bs.collapse")
              , a = e.extend({}, i.DEFAULTS, n.data(), "object" == typeof t && t);
            !r && a.toggle && "show" == t && (a.toggle = !1),
            r || n.data("bs.collapse", r = new i(this,a)),
            "string" == typeof t && r[t]()
        })
    }
    var i = function(t, n) {
        this.$element = e(t),
        this.options = e.extend({}, i.DEFAULTS, n),
        this.$trigger = e(this.options.trigger).filter('[href="#' + t.id + '"], [data-target="#' + t.id + '"]'),
        this.transitioning = null,
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle()
    };
    i.VERSION = "3.3.1",
    i.TRANSITION_DURATION = 350,
    i.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    },
    i.prototype.dimension = function() {
        var e = this.$element.hasClass("width");
        return e ? "width" : "height"
    }
    ,
    i.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, r = this.$parent && this.$parent.find("> .panel").children(".in, .collapsing");
            if (!(r && r.length && (t = r.data("bs.collapse"),
            t && t.transitioning))) {
                var a = e.Event("show.bs.collapse");
                if (this.$element.trigger(a),
                !a.isDefaultPrevented()) {
                    r && r.length && (n.call(r, "hide"),
                    t || r.data("bs.collapse", null));
                    var o = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded", !0),
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                    this.transitioning = 1;
                    var s = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[o](""),
                        this.transitioning = 0,
                        this.$element.trigger("shown.bs.collapse")
                    };
                    if (!e.support.transition)
                        return s.call(this);
                    var l = e.camelCase(["scroll", o].join("-"));
                    this.$element.one("bsTransitionEnd", e.proxy(s, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[o](this.$element[0][l])
                }
            }
        }
    }
    ,
    i.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = e.Event("hide.bs.collapse");
            if (this.$element.trigger(t),
            !t.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                this.transitioning = 1;
                var r = function() {
                    this.transitioning = 0,
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return e.support.transition ? void this.$element[n](0).one("bsTransitionEnd", e.proxy(r, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : r.call(this)
            }
        }
    }
    ,
    i.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ,
    i.prototype.getParent = function() {
        return e(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(e.proxy(function(n, i) {
            var r = e(i);
            this.addAriaAndCollapsedClass(t(r), r)
        }, this)).end()
    }
    ,
    i.prototype.addAriaAndCollapsedClass = function(e, t) {
        var n = e.hasClass("in");
        e.attr("aria-expanded", n),
        t.toggleClass("collapsed", !n).attr("aria-expanded", n)
    }
    ;
    var r = e.fn.collapse;
    e.fn.collapse = n,
    e.fn.collapse.Constructor = i,
    e.fn.collapse.noConflict = function() {
        return e.fn.collapse = r,
        this
    }
    ,
    e(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(i) {
        var r = e(this);
        r.attr("data-target") || i.preventDefault();
        var a = t(r)
          , o = a.data("bs.collapse")
          , s = o ? "toggle" : e.extend({}, r.data(), {
            trigger: this
        });
        n.call(a, s)
    })
}(jQuery),
+function(e) {
    "use strict";
    function t(t) {
        t && 3 === t.which || (e(r).remove(),
        e(a).each(function() {
            var i = e(this)
              , r = n(i)
              , a = {
                relatedTarget: this
            };
            r.hasClass("open") && (r.trigger(t = e.Event("hide.bs.dropdown", a)),
            t.isDefaultPrevented() || (i.attr("aria-expanded", "false"),
            r.removeClass("open").trigger("hidden.bs.dropdown", a)))
        }))
    }
    function n(t) {
        var n = t.attr("data-target");
        n || (n = t.attr("href"),
        n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var i = n && e(n);
        return i && i.length ? i : t.parent()
    }
    function i(t) {
        return this.each(function() {
            var n = e(this)
              , i = n.data("bs.dropdown");
            i || n.data("bs.dropdown", i = new o(this)),
            "string" == typeof t && i[t].call(n)
        })
    }
    var r = ".dropdown-backdrop"
      , a = '[data-toggle="dropdown"]'
      , o = function(t) {
        e(t).on("click.bs.dropdown", this.toggle)
    };
    o.VERSION = "3.3.1",
    o.prototype.toggle = function(i) {
        var r = e(this);
        if (!r.is(".disabled, :disabled")) {
            var a = n(r)
              , o = a.hasClass("open");
            if (t(),
            !o) {
                "ontouchstart"in document.documentElement && !a.closest(".navbar-nav").length && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", t);
                var s = {
                    relatedTarget: this
                };
                if (a.trigger(i = e.Event("show.bs.dropdown", s)),
                i.isDefaultPrevented())
                    return;
                r.trigger("focus").attr("aria-expanded", "true"),
                a.toggleClass("open").trigger("shown.bs.dropdown", s)
            }
            return !1
        }
    }
    ,
    o.prototype.keydown = function(t) {
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName)) {
            var i = e(this);
            if (t.preventDefault(),
            t.stopPropagation(),
            !i.is(".disabled, :disabled")) {
                var r = n(i)
                  , o = r.hasClass("open");
                if (!o && 27 != t.which || o && 27 == t.which)
                    return 27 == t.which && r.find(a).trigger("focus"),
                    i.trigger("click");
                var s = " li:not(.divider):visible a"
                  , l = r.find('[role="menu"]' + s + ', [role="listbox"]' + s);
                if (l.length) {
                    var c = l.index(t.target);
                    38 == t.which && c > 0 && c--,
                    40 == t.which && c < l.length - 1 && c++,
                    ~c || (c = 0),
                    l.eq(c).trigger("focus")
                }
            }
        }
    }
    ;
    var s = e.fn.dropdown;
    e.fn.dropdown = i,
    e.fn.dropdown.Constructor = o,
    e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = s,
        this
    }
    ,
    e(document).on("click.bs.dropdown.data-api", t).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", a, o.prototype.toggle).on("keydown.bs.dropdown.data-api", a, o.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', o.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', o.prototype.keydown)
}(jQuery),
+function(e) {
    "use strict";
    function t(t, i) {
        return this.each(function() {
            var r = e(this)
              , a = r.data("bs.modal")
              , o = e.extend({}, n.DEFAULTS, r.data(), "object" == typeof t && t);
            a || r.data("bs.modal", a = new n(this,o)),
            "string" == typeof t ? a[t](i) : o.show && a.show(i)
        })
    }
    var n = function(t, n) {
        this.options = n,
        this.$body = e(document.body),
        this.$element = e(t),
        this.$backdrop = this.isShown = null,
        this.scrollbarWidth = 0,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, e.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    n.VERSION = "3.3.1",
    n.TRANSITION_DURATION = 300,
    n.BACKDROP_TRANSITION_DURATION = 150,
    n.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    n.prototype.toggle = function(e) {
        return this.isShown ? this.hide() : this.show(e)
    }
    ,
    n.prototype.show = function(t) {
        var i = this
          , r = e.Event("show.bs.modal", {
            relatedTarget: t
        });
        this.$element.trigger(r),
        this.isShown || r.isDefaultPrevented() || (this.isShown = !0,
        this.checkScrollbar(),
        this.setScrollbar(),
        this.$body.addClass("modal-open"),
        this.escape(),
        this.resize(),
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)),
        this.backdrop(function() {
            var r = e.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body),
            i.$element.show().scrollTop(0),
            i.options.backdrop && i.adjustBackdrop(),
            i.adjustDialog(),
            r && i.$element[0].offsetWidth,
            i.$element.addClass("in").attr("aria-hidden", !1),
            i.enforceFocus();
            var a = e.Event("shown.bs.modal", {
                relatedTarget: t
            });
            r ? i.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                i.$element.trigger("focus").trigger(a)
            }).emulateTransitionEnd(n.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(a)
        }))
    }
    ,
    n.prototype.hide = function(t) {
        t && t.preventDefault(),
        t = e.Event("hide.bs.modal"),
        this.$element.trigger(t),
        this.isShown && !t.isDefaultPrevented() && (this.isShown = !1,
        this.escape(),
        this.resize(),
        e(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"),
        e.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", e.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
    }
    ,
    n.prototype.enforceFocus = function() {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) {
            this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
        }, this))
    }
    ,
    n.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", e.proxy(function(e) {
            27 == e.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }
    ,
    n.prototype.resize = function() {
        this.isShown ? e(window).on("resize.bs.modal", e.proxy(this.handleUpdate, this)) : e(window).off("resize.bs.modal")
    }
    ,
    n.prototype.hideModal = function() {
        var e = this;
        this.$element.hide(),
        this.backdrop(function() {
            e.$body.removeClass("modal-open"),
            e.resetAdjustments(),
            e.resetScrollbar(),
            e.$element.trigger("hidden.bs.modal")
        })
    }
    ,
    n.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    }
    ,
    n.prototype.backdrop = function(t) {
        var i = this
          , r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var a = e.support.transition && r;
            if (this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", e.proxy(function(e) {
                e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this)),
            a && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !t)
                return;
            a ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : t()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var o = function() {
                i.removeBackdrop(),
                t && t()
            };
            e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", o).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : o()
        } else
            t && t()
    }
    ,
    n.prototype.handleUpdate = function() {
        this.options.backdrop && this.adjustBackdrop(),
        this.adjustDialog()
    }
    ,
    n.prototype.adjustBackdrop = function() {
        this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight)
    }
    ,
    n.prototype.adjustDialog = function() {
        var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : ""
        })
    }
    ,
    n.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }
    ,
    n.prototype.checkScrollbar = function() {
        this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight,
        this.scrollbarWidth = this.measureScrollbar()
    }
    ,
    n.prototype.setScrollbar = function() {
        var e = parseInt(this.$body.css("padding-right") || 0, 10);
        this.bodyIsOverflowing && this.$body.css("padding-right", e + this.scrollbarWidth)
    }
    ,
    n.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "")
    }
    ,
    n.prototype.measureScrollbar = function() {
        var e = document.createElement("div");
        e.className = "modal-scrollbar-measure",
        this.$body.append(e);
        var t = e.offsetWidth - e.clientWidth;
        return this.$body[0].removeChild(e),
        t
    }
    ;
    var i = e.fn.modal;
    e.fn.modal = t,
    e.fn.modal.Constructor = n,
    e.fn.modal.noConflict = function() {
        return e.fn.modal = i,
        this
    }
    ,
    e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(n) {
        var i = e(this)
          , r = i.attr("href")
          , a = e(i.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, ""))
          , o = a.data("bs.modal") ? "toggle" : e.extend({
            remote: !/#/.test(r) && r
        }, a.data(), i.data());
        i.is("a") && n.preventDefault(),
        a.one("show.bs.modal", function(e) {
            e.isDefaultPrevented() || a.one("hidden.bs.modal", function() {
                i.is(":visible") && i.trigger("focus")
            })
        }),
        t.call(a, o, this)
    })
}(jQuery),
+function(e) {
    "use strict";
    function t(t) {
        return this.each(function() {
            var i = e(this)
              , r = i.data("bs.tooltip")
              , a = "object" == typeof t && t
              , o = a && a.selector;
            (r || "destroy" != t) && (o ? (r || i.data("bs.tooltip", r = {}),
            r[o] || (r[o] = new n(this,a))) : r || i.data("bs.tooltip", r = new n(this,a)),
            "string" == typeof t && r[t]())
        })
    }
    var n = function(e, t) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null,
        this.init("tooltip", e, t)
    };
    n.VERSION = "3.3.1",
    n.TRANSITION_DURATION = 150,
    n.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    },
    n.prototype.init = function(t, n, i) {
        this.enabled = !0,
        this.type = t,
        this.$element = e(n),
        this.options = this.getOptions(i),
        this.$viewport = this.options.viewport && e(this.options.viewport.selector || this.options.viewport);
        for (var r = this.options.trigger.split(" "), a = r.length; a--; ) {
            var o = r[a];
            if ("click" == o)
                this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
            else if ("manual" != o) {
                var s = "hover" == o ? "mouseenter" : "focusin"
                  , l = "hover" == o ? "mouseleave" : "focusout";
                this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.enter, this)),
                this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ,
    n.prototype.getDefaults = function() {
        return n.DEFAULTS
    }
    ,
    n.prototype.getOptions = function(t) {
        return t = e.extend({}, this.getDefaults(), this.$element.data(), t),
        t.delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }),
        t
    }
    ,
    n.prototype.getDelegateOptions = function() {
        var t = {}
          , n = this.getDefaults();
        return this._options && e.each(this._options, function(e, i) {
            n[e] != i && (t[e] = i)
        }),
        t
    }
    ,
    n.prototype.enter = function(t) {
        var n = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
        return n && n.$tip && n.$tip.is(":visible") ? void (n.hoverState = "in") : (n || (n = new this.constructor(t.currentTarget,this.getDelegateOptions()),
        e(t.currentTarget).data("bs." + this.type, n)),
        clearTimeout(n.timeout),
        n.hoverState = "in",
        n.options.delay && n.options.delay.show ? void (n.timeout = setTimeout(function() {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show())
    }
    ,
    n.prototype.leave = function(t) {
        var n = t instanceof this.constructor ? t : e(t.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(t.currentTarget,this.getDelegateOptions()),
        e(t.currentTarget).data("bs." + this.type, n)),
        clearTimeout(n.timeout),
        n.hoverState = "out",
        n.options.delay && n.options.delay.hide ? void (n.timeout = setTimeout(function() {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide()
    }
    ,
    n.prototype.show = function() {
        var t = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(t);
            var i = e.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (t.isDefaultPrevented() || !i)
                return;
            var r = this
              , a = this.tip()
              , o = this.getUID(this.type);
            this.setContent(),
            a.attr("id", o),
            this.$element.attr("aria-describedby", o),
            this.options.animation && a.addClass("fade");
            var s = "function" == typeof this.options.placement ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement
              , l = /\s?auto?\s?/i
              , c = l.test(s);
            c && (s = s.replace(l, "") || "top"),
            a.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(s).data("bs." + this.type, this),
            this.options.container ? a.appendTo(this.options.container) : a.insertAfter(this.$element);
            var u = this.getPosition()
              , d = a[0].offsetWidth
              , p = a[0].offsetHeight;
            if (c) {
                var h = s
                  , f = this.options.container ? e(this.options.container) : this.$element.parent()
                  , g = this.getPosition(f);
                s = "bottom" == s && u.bottom + p > g.bottom ? "top" : "top" == s && u.top - p < g.top ? "bottom" : "right" == s && u.right + d > g.width ? "left" : "left" == s && u.left - d < g.left ? "right" : s,
                a.removeClass(h).addClass(s)
            }
            var m = this.getCalculatedOffset(s, u, d, p);
            this.applyPlacement(m, s);
            var b = function() {
                var e = r.hoverState;
                r.$element.trigger("shown.bs." + r.type),
                r.hoverState = null,
                "out" == e && r.leave(r)
            };
            e.support.transition && this.$tip.hasClass("fade") ? a.one("bsTransitionEnd", b).emulateTransitionEnd(n.TRANSITION_DURATION) : b()
        }
    }
    ,
    n.prototype.applyPlacement = function(t, n) {
        var i = this.tip()
          , r = i[0].offsetWidth
          , a = i[0].offsetHeight
          , o = parseInt(i.css("margin-top"), 10)
          , s = parseInt(i.css("margin-left"), 10);
        isNaN(o) && (o = 0),
        isNaN(s) && (s = 0),
        t.top = t.top + o,
        t.left = t.left + s,
        e.offset.setOffset(i[0], e.extend({
            using: function(e) {
                i.css({
                    top: Math.round(e.top),
                    left: Math.round(e.left)
                })
            }
        }, t), 0),
        i.addClass("in");
        var l = i[0].offsetWidth
          , c = i[0].offsetHeight;
        "top" == n && c != a && (t.top = t.top + a - c);
        var u = this.getViewportAdjustedDelta(n, t, l, c);
        u.left ? t.left += u.left : t.top += u.top;
        var d = /top|bottom/.test(n)
          , p = d ? 2 * u.left - r + l : 2 * u.top - a + c
          , h = d ? "offsetWidth" : "offsetHeight";
        i.offset(t),
        this.replaceArrow(p, i[0][h], d)
    }
    ,
    n.prototype.replaceArrow = function(e, t, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - e / t) + "%").css(n ? "top" : "left", "")
    }
    ,
    n.prototype.setContent = function() {
        var e = this.tip()
          , t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t),
        e.removeClass("fade in top bottom left right")
    }
    ,
    n.prototype.hide = function(t) {
        function i() {
            "in" != r.hoverState && a.detach(),
            r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type),
            t && t()
        }
        var r = this
          , a = this.tip()
          , o = e.Event("hide.bs." + this.type);
        return this.$element.trigger(o),
        o.isDefaultPrevented() ? void 0 : (a.removeClass("in"),
        e.support.transition && this.$tip.hasClass("fade") ? a.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i(),
        this.hoverState = null,
        this)
    }
    ,
    n.prototype.fixTitle = function() {
        var e = this.$element;
        (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }
    ,
    n.prototype.hasContent = function() {
        return this.getTitle()
    }
    ,
    n.prototype.getPosition = function(t) {
        t = t || this.$element;
        var n = t[0]
          , i = "BODY" == n.tagName
          , r = n.getBoundingClientRect();
        null == r.width && (r = e.extend({}, r, {
            width: r.right - r.left,
            height: r.bottom - r.top
        }));
        var a = i ? {
            top: 0,
            left: 0
        } : t.offset()
          , o = {
            scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
        }
          , s = i ? {
            width: e(window).width(),
            height: e(window).height()
        } : null;
        return e.extend({}, r, o, s, a)
    }
    ,
    n.prototype.getCalculatedOffset = function(e, t, n, i) {
        return "bottom" == e ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - n / 2
        } : "top" == e ? {
            top: t.top - i,
            left: t.left + t.width / 2 - n / 2
        } : "left" == e ? {
            top: t.top + t.height / 2 - i / 2,
            left: t.left - n
        } : {
            top: t.top + t.height / 2 - i / 2,
            left: t.left + t.width
        }
    }
    ,
    n.prototype.getViewportAdjustedDelta = function(e, t, n, i) {
        var r = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return r;
        var a = this.options.viewport && this.options.viewport.padding || 0
          , o = this.getPosition(this.$viewport);
        if (/right|left/.test(e)) {
            var s = t.top - a - o.scroll
              , l = t.top + a - o.scroll + i;
            s < o.top ? r.top = o.top - s : l > o.top + o.height && (r.top = o.top + o.height - l)
        } else {
            var c = t.left - a
              , u = t.left + a + n;
            c < o.left ? r.left = o.left - c : u > o.width && (r.left = o.left + o.width - u)
        }
        return r
    }
    ,
    n.prototype.getTitle = function() {
        var e, t = this.$element, n = this.options;
        return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
    }
    ,
    n.prototype.getUID = function(e) {
        do
            e += ~~(1e6 * Math.random());
        while (document.getElementById(e));
        return e
    }
    ,
    n.prototype.tip = function() {
        return this.$tip = this.$tip || e(this.options.template)
    }
    ,
    n.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ,
    n.prototype.enable = function() {
        this.enabled = !0
    }
    ,
    n.prototype.disable = function() {
        this.enabled = !1
    }
    ,
    n.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ,
    n.prototype.toggle = function(t) {
        var n = this;
        t && (n = e(t.currentTarget).data("bs." + this.type),
        n || (n = new this.constructor(t.currentTarget,this.getDelegateOptions()),
        e(t.currentTarget).data("bs." + this.type, n))),
        n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }
    ,
    n.prototype.destroy = function() {
        var e = this;
        clearTimeout(this.timeout),
        this.hide(function() {
            e.$element.off("." + e.type).removeData("bs." + e.type)
        })
    }
    ;
    var i = e.fn.tooltip;
    e.fn.tooltip = t,
    e.fn.tooltip.Constructor = n,
    e.fn.tooltip.noConflict = function() {
        return e.fn.tooltip = i,
        this
    }
}(jQuery),
+function(e) {
    "use strict";
    function t(t) {
        return this.each(function() {
            var i = e(this)
              , r = i.data("bs.popover")
              , a = "object" == typeof t && t
              , o = a && a.selector;
            (r || "destroy" != t) && (o ? (r || i.data("bs.popover", r = {}),
            r[o] || (r[o] = new n(this,a))) : r || i.data("bs.popover", r = new n(this,a)),
            "string" == typeof t && r[t]())
        })
    }
    var n = function(e, t) {
        this.init("popover", e, t)
    };
    if (!e.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    n.VERSION = "3.3.1",
    n.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    n.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype),
    n.prototype.constructor = n,
    n.prototype.getDefaults = function() {
        return n.DEFAULTS
    }
    ,
    n.prototype.setContent = function() {
        var e = this.tip()
          , t = this.getTitle()
          , n = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t),
        e.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n),
        e.removeClass("fade top bottom left right in"),
        e.find(".popover-title").html() || e.find(".popover-title").hide()
    }
    ,
    n.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    ,
    n.prototype.getContent = function() {
        var e = this.$element
          , t = this.options;
        return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
    }
    ,
    n.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }
    ,
    n.prototype.tip = function() {
        return this.$tip || (this.$tip = e(this.options.template)),
        this.$tip
    }
    ;
    var i = e.fn.popover;
    e.fn.popover = t,
    e.fn.popover.Constructor = n,
    e.fn.popover.noConflict = function() {
        return e.fn.popover = i,
        this
    }
}(jQuery),
+function(e) {
    "use strict";
    function t(n, i) {
        var r = e.proxy(this.process, this);
        this.$body = e("body"),
        this.$scrollElement = e(e(n).is("body") ? window : n),
        this.options = e.extend({}, t.DEFAULTS, i),
        this.selector = (this.options.target || "") + " .nav li > a",
        this.offsets = [],
        this.targets = [],
        this.activeTarget = null,
        this.scrollHeight = 0,
        this.$scrollElement.on("scroll.bs.scrollspy", r),
        this.refresh(),
        this.process()
    }
    function n(n) {
        return this.each(function() {
            var i = e(this)
              , r = i.data("bs.scrollspy")
              , a = "object" == typeof n && n;
            r || i.data("bs.scrollspy", r = new t(this,a)),
            "string" == typeof n && r[n]()
        })
    }
    t.VERSION = "3.3.1",
    t.DEFAULTS = {
        offset: 10
    },
    t.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }
    ,
    t.prototype.refresh = function() {
        var t = "offset"
          , n = 0;
        e.isWindow(this.$scrollElement[0]) || (t = "position",
        n = this.$scrollElement.scrollTop()),
        this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight();
        var i = this;
        this.$body.find(this.selector).map(function() {
            var i = e(this)
              , r = i.data("target") || i.attr("href")
              , a = /^#./.test(r) && e(r);
            return a && a.length && a.is(":visible") && [[a[t]().top + n, r]] || null
        }).sort(function(e, t) {
            return e[0] - t[0]
        }).each(function() {
            i.offsets.push(this[0]),
            i.targets.push(this[1])
        })
    }
    ,
    t.prototype.process = function() {
        var e, t = this.$scrollElement.scrollTop() + this.options.offset, n = this.getScrollHeight(), i = this.options.offset + n - this.$scrollElement.height(), r = this.offsets, a = this.targets, o = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(),
        t >= i)
            return o != (e = a[a.length - 1]) && this.activate(e);
        if (o && t < r[0])
            return this.activeTarget = null,
            this.clear();
        for (e = r.length; e--; )
            o != a[e] && t >= r[e] && (!r[e + 1] || t <= r[e + 1]) && this.activate(a[e])
    }
    ,
    t.prototype.activate = function(t) {
        this.activeTarget = t,
        this.clear();
        var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]'
          , i = e(n).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")),
        i.trigger("activate.bs.scrollspy")
    }
    ,
    t.prototype.clear = function() {
        e(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    }
    ;
    var i = e.fn.scrollspy;
    e.fn.scrollspy = n,
    e.fn.scrollspy.Constructor = t,
    e.fn.scrollspy.noConflict = function() {
        return e.fn.scrollspy = i,
        this
    }
    ,
    e(window).on("load.bs.scrollspy.data-api", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            n.call(t, t.data())
        })
    })
}(jQuery),
+function(e) {
    "use strict";
    function t(t) {
        return this.each(function() {
            var i = e(this)
              , r = i.data("bs.tab");
            r || i.data("bs.tab", r = new n(this)),
            "string" == typeof t && r[t]()
        })
    }
    var n = function(t) {
        this.element = e(t)
    };
    n.VERSION = "3.3.1",
    n.TRANSITION_DURATION = 150,
    n.prototype.show = function() {
        var t = this.element
          , n = t.closest("ul:not(.dropdown-menu)")
          , i = t.data("target");
        if (i || (i = t.attr("href"),
        i = i && i.replace(/.*(?=#[^\s]*$)/, "")),
        !t.parent("li").hasClass("active")) {
            var r = n.find(".active:last a")
              , a = e.Event("hide.bs.tab", {
                relatedTarget: t[0]
            })
              , o = e.Event("show.bs.tab", {
                relatedTarget: r[0]
            });
            if (r.trigger(a),
            t.trigger(o),
            !o.isDefaultPrevented() && !a.isDefaultPrevented()) {
                var s = e(i);
                this.activate(t.closest("li"), n),
                this.activate(s, s.parent(), function() {
                    r.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: t[0]
                    }),
                    t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: r[0]
                    })
                })
            }
        }
    }
    ,
    n.prototype.activate = function(t, i, r) {
        function a() {
            o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            s ? (t[0].offsetWidth,
            t.addClass("in")) : t.removeClass("fade"),
            t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            r && r()
        }
        var o = i.find("> .active")
          , s = r && e.support.transition && (o.length && o.hasClass("fade") || !!i.find("> .fade").length);
        o.length && s ? o.one("bsTransitionEnd", a).emulateTransitionEnd(n.TRANSITION_DURATION) : a(),
        o.removeClass("in")
    }
    ;
    var i = e.fn.tab;
    e.fn.tab = t,
    e.fn.tab.Constructor = n,
    e.fn.tab.noConflict = function() {
        return e.fn.tab = i,
        this
    }
    ;
    var r = function(n) {
        n.preventDefault(),
        t.call(e(this), "show")
    };
    e(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', r).on("click.bs.tab.data-api", '[data-toggle="pill"]', r)
}(jQuery),
+function(e) {
    "use strict";
    function t(t) {
        return this.each(function() {
            var i = e(this)
              , r = i.data("bs.affix")
              , a = "object" == typeof t && t;
            r || i.data("bs.affix", r = new n(this,a)),
            "string" == typeof t && r[t]()
        })
    }
    var n = function(t, i) {
        this.options = e.extend({}, n.DEFAULTS, i),
        this.$target = e(this.options.target).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = e(t),
        this.affixed = this.unpin = this.pinnedOffset = null,
        this.checkPosition()
    };
    n.VERSION = "3.3.1",
    n.RESET = "affix affix-top affix-bottom",
    n.DEFAULTS = {
        offset: 0,
        target: window
    },
    n.prototype.getState = function(e, t, n, i) {
        var r = this.$target.scrollTop()
          , a = this.$element.offset()
          , o = this.$target.height();
        if (null != n && "top" == this.affixed)
            return n > r ? "top" : !1;
        if ("bottom" == this.affixed)
            return null != n ? r + this.unpin <= a.top ? !1 : "bottom" : e - i >= r + o ? !1 : "bottom";
        var s = null == this.affixed
          , l = s ? r : a.top
          , c = s ? o : t;
        return null != n && n >= l ? "top" : null != i && l + c >= e - i ? "bottom" : !1
    }
    ,
    n.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(n.RESET).addClass("affix");
        var e = this.$target.scrollTop()
          , t = this.$element.offset();
        return this.pinnedOffset = t.top - e
    }
    ,
    n.prototype.checkPositionWithEventLoop = function() {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    }
    ,
    n.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var t = this.$element.height()
              , i = this.options.offset
              , r = i.top
              , a = i.bottom
              , o = e("body").height();
            "object" != typeof i && (a = r = i),
            "function" == typeof r && (r = i.top(this.$element)),
            "function" == typeof a && (a = i.bottom(this.$element));
            var s = this.getState(o, t, r, a);
            if (this.affixed != s) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (s ? "-" + s : "")
                  , c = e.Event(l + ".bs.affix");
                if (this.$element.trigger(c),
                c.isDefaultPrevented())
                    return;
                this.affixed = s,
                this.unpin = "bottom" == s ? this.getPinnedOffset() : null,
                this.$element.removeClass(n.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == s && this.$element.offset({
                top: o - t - a
            })
        }
    }
    ;
    var i = e.fn.affix;
    e.fn.affix = t,
    e.fn.affix.Constructor = n,
    e.fn.affix.noConflict = function() {
        return e.fn.affix = i,
        this
    }
    ,
    e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var n = e(this)
              , i = n.data();
            i.offset = i.offset || {},
            null != i.offsetBottom && (i.offset.bottom = i.offsetBottom),
            null != i.offsetTop && (i.offset.top = i.offsetTop),
            t.call(n, i)
        })
    })
}(jQuery),
function() {
    function e(e) {
        this.tokens = [],
        this.tokens.links = {},
        this.options = e || c.defaults,
        this.rules = u.normal,
        this.options.gfm && (this.rules = this.options.tables ? u.tables : u.gfm)
    }
    function t(e, t) {
        if (this.options = t || c.defaults,
        this.links = e,
        this.rules = d.normal,
        this.renderer = this.options.renderer || new n,
        this.renderer.options = this.options,
        !this.links)
            throw new Error("Tokens array requires a `links` property.");
        this.options.gfm ? this.rules = this.options.breaks ? d.breaks : d.gfm : this.options.pedantic && (this.rules = d.pedantic)
    }
    function n(e) {
        this.options = e || {}
    }
    function i(e) {
        this.tokens = [],
        this.token = null,
        this.options = e || c.defaults,
        this.options.renderer = this.options.renderer || new n,
        this.renderer = this.options.renderer,
        this.renderer.options = this.options
    }
    function r(e, t) {
        return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }
    function a(e) {
        return e.replace(/&([#\w]+);/g, function(e, t) {
            return t = t.toLowerCase(),
            "colon" === t ? ":" : "#" === t.charAt(0) ? String.fromCharCode("x" === t.charAt(1) ? parseInt(t.substring(2), 16) : +t.substring(1)) : ""
        })
    }
    function o(e, t) {
        return e = e.source,
        t = t || "",
        function n(i, r) {
            return i ? (r = r.source || r,
            r = r.replace(/(^|[^\[])\^/g, "$1"),
            e = e.replace(i, r),
            n) : new RegExp(e,t)
        }
    }
    function s() {}
    function l(e) {
        for (var t, n, i = 1; i < arguments.length; i++) {
            t = arguments[i];
            for (n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }
        return e
    }
    function c(t, n, a) {
        if (a || "function" == typeof n) {
            a || (a = n,
            n = null),
            n = l({}, c.defaults, n || {});
            var o, s, u = n.highlight, d = 0;
            try {
                o = e.lex(t, n)
            } catch (p) {
                return a(p)
            }
            s = o.length;
            var h = function(e) {
                if (e)
                    return n.highlight = u,
                    a(e);
                var t;
                try {
                    t = i.parse(o, n)
                } catch (r) {
                    e = r
                }
                return n.highlight = u,
                e ? a(e) : a(null, t)
            };
            if (!u || u.length < 3)
                return h();
            if (delete n.highlight,
            !s)
                return h();
            for (; d < o.length; d++)
                !function(e) {
                    return "code" !== e.type ? --s || h() : u(e.text, e.lang, function(t, n) {
                        return t ? h(t) : null == n || n === e.text ? --s || h() : (e.text = n,
                        e.escaped = !0,
                        void (--s || h()))
                    })
                }(o[d])
        } else
            try {
                return n && (n = l({}, c.defaults, n)),
                i.parse(e.lex(t, n), n)
            } catch (p) {
                if (p.message += "\nPlease report this to https://github.com/chjj/marked.",
                (n || c.defaults).silent)
                    return "<p>An error occured:</p><pre>" + r(p.message + "", !0) + "</pre>";
                throw p
            }
    }
    var u = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        fences: s,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
        nptable: s,
        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
        blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        table: s,
        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
        text: /^[^\n]+/
    };
    u.bullet = /(?:[*+-]|\d+\.)/,
    u.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,
    u.item = o(u.item, "gm")(/bull/g, u.bullet)(),
    u.list = o(u.list)(/bull/g, u.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + u.def.source + ")")(),
    u.blockquote = o(u.blockquote)("def", u.def)(),
    u._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",
    u.html = o(u.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, u._tag)(),
    u.paragraph = o(u.paragraph)("hr", u.hr)("heading", u.heading)("lheading", u.lheading)("blockquote", u.blockquote)("tag", "<" + u._tag)("def", u.def)(),
    u.normal = l({}, u),
    u.gfm = l({}, u.normal, {
        fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
        paragraph: /^/,
        heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
    }),
    u.gfm.paragraph = o(u.paragraph)("(?!", "(?!" + u.gfm.fences.source.replace("\\1", "\\2") + "|" + u.list.source.replace("\\1", "\\3") + "|")(),
    u.tables = l({}, u.gfm, {
        nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
    }),
    e.rules = u,
    e.lex = function(t, n) {
        var i = new e(n);
        return i.lex(t)
    }
    ,
    e.prototype.lex = function(e) {
        return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"),
        this.token(e, !0)
    }
    ,
    e.prototype.token = function(e, t, n) {
        for (var i, r, a, o, s, l, c, d, p, e = e.replace(/^ +$/gm, ""); e; )
            if ((a = this.rules.newline.exec(e)) && (e = e.substring(a[0].length),
            a[0].length > 1 && this.tokens.push({
                type: "space"
            })),
            a = this.rules.code.exec(e))
                e = e.substring(a[0].length),
                a = a[0].replace(/^ {4}/gm, ""),
                this.tokens.push({
                    type: "code",
                    text: this.options.pedantic ? a : a.replace(/\n+$/, "")
                });
            else if (a = this.rules.fences.exec(e))
                e = e.substring(a[0].length),
                this.tokens.push({
                    type: "code",
                    lang: a[2],
                    text: a[3] || ""
                });
            else if (a = this.rules.heading.exec(e))
                e = e.substring(a[0].length),
                this.tokens.push({
                    type: "heading",
                    depth: a[1].length,
                    text: a[2]
                });
            else if (t && (a = this.rules.nptable.exec(e))) {
                for (e = e.substring(a[0].length),
                l = {
                    type: "table",
                    header: a[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                    align: a[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    cells: a[3].replace(/\n$/, "").split("\n")
                },
                d = 0; d < l.align.length; d++)
                    l.align[d] = /^ *-+: *$/.test(l.align[d]) ? "right" : /^ *:-+: *$/.test(l.align[d]) ? "center" : /^ *:-+ *$/.test(l.align[d]) ? "left" : null;
                for (d = 0; d < l.cells.length; d++)
                    l.cells[d] = l.cells[d].split(/ *\| */);
                this.tokens.push(l)
            } else if (a = this.rules.lheading.exec(e))
                e = e.substring(a[0].length),
                this.tokens.push({
                    type: "heading",
                    depth: "=" === a[2] ? 1 : 2,
                    text: a[1]
                });
            else if (a = this.rules.hr.exec(e))
                e = e.substring(a[0].length),
                this.tokens.push({
                    type: "hr"
                });
            else if (a = this.rules.blockquote.exec(e))
                e = e.substring(a[0].length),
                this.tokens.push({
                    type: "blockquote_start"
                }),
                a = a[0].replace(/^ *> ?/gm, ""),
                this.token(a, t, !0),
                this.tokens.push({
                    type: "blockquote_end"
                });
            else if (a = this.rules.list.exec(e)) {
                for (e = e.substring(a[0].length),
                o = a[2],
                this.tokens.push({
                    type: "list_start",
                    ordered: o.length > 1
                }),
                a = a[0].match(this.rules.item),
                i = !1,
                p = a.length,
                d = 0; p > d; d++)
                    l = a[d],
                    c = l.length,
                    l = l.replace(/^ *([*+-]|\d+\.) +/, ""),
                    ~l.indexOf("\n ") && (c -= l.length,
                    l = this.options.pedantic ? l.replace(/^ {1,4}/gm, "") : l.replace(new RegExp("^ {1," + c + "}","gm"), "")),
                    this.options.smartLists && d !== p - 1 && (s = u.bullet.exec(a[d + 1])[0],
                    o === s || o.length > 1 && s.length > 1 || (e = a.slice(d + 1).join("\n") + e,
                    d = p - 1)),
                    r = i || /\n\n(?!\s*$)/.test(l),
                    d !== p - 1 && (i = "\n" === l.charAt(l.length - 1),
                    r || (r = i)),
                    this.tokens.push({
                        type: r ? "loose_item_start" : "list_item_start"
                    }),
                    this.token(l, !1, n),
                    this.tokens.push({
                        type: "list_item_end"
                    });
                this.tokens.push({
                    type: "list_end"
                })
            } else if (a = this.rules.html.exec(e))
                e = e.substring(a[0].length),
                this.tokens.push({
                    type: this.options.sanitize ? "paragraph" : "html",
                    pre: !this.options.sanitizer && ("pre" === a[1] || "script" === a[1] || "style" === a[1]),
                    text: a[0]
                });
            else if (!n && t && (a = this.rules.def.exec(e)))
                e = e.substring(a[0].length),
                this.tokens.links[a[1].toLowerCase()] = {
                    href: a[2],
                    title: a[3]
                };
            else if (t && (a = this.rules.table.exec(e))) {
                for (e = e.substring(a[0].length),
                l = {
                    type: "table",
                    header: a[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                    align: a[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    cells: a[3].replace(/(?: *\| *)?\n$/, "").split("\n")
                },
                d = 0; d < l.align.length; d++)
                    l.align[d] = /^ *-+: *$/.test(l.align[d]) ? "right" : /^ *:-+: *$/.test(l.align[d]) ? "center" : /^ *:-+ *$/.test(l.align[d]) ? "left" : null;
                for (d = 0; d < l.cells.length; d++)
                    l.cells[d] = l.cells[d].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
                this.tokens.push(l)
            } else if (t && (a = this.rules.paragraph.exec(e)))
                e = e.substring(a[0].length),
                this.tokens.push({
                    type: "paragraph",
                    text: "\n" === a[1].charAt(a[1].length - 1) ? a[1].slice(0, -1) : a[1]
                });
            else if (a = this.rules.text.exec(e))
                e = e.substring(a[0].length),
                this.tokens.push({
                    type: "text",
                    text: a[0]
                });
            else if (e)
                throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
        return this.tokens
    }
    ;
    var d = {
        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
        autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
        url: s,
        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
        link: /^!?\[(inside)\]\(href\)/,
        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
        em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
        code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
        br: /^ {2,}\n(?!\s*$)/,
        del: s,
        text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
    };
    d._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,
    d._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,
    d.link = o(d.link)("inside", d._inside)("href", d._href)(),
    d.reflink = o(d.reflink)("inside", d._inside)(),
    d.normal = l({}, d),
    d.pedantic = l({}, d.normal, {
        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
    }),
    d.gfm = l({}, d.normal, {
        escape: o(d.escape)("])", "~|])")(),
        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
        del: /^~~(?=\S)([\s\S]*?\S)~~/,
        text: o(d.text)("]|", "~]|")("|", "|https?://|")()
    }),
    d.breaks = l({}, d.gfm, {
        br: o(d.br)("{2,}", "*")(),
        text: o(d.gfm.text)("{2,}", "*")()
    }),
    t.rules = d,
    t.output = function(e, n, i) {
        var r = new t(n,i);
        return r.output(e)
    }
    ,
    t.prototype.output = function(e) {
        for (var t, n, i, a, o = ""; e; )
            if (a = this.rules.escape.exec(e))
                e = e.substring(a[0].length),
                o += a[1];
            else if (a = this.rules.autolink.exec(e))
                e = e.substring(a[0].length),
                "@" === a[2] ? (n = this.mangle(":" === a[1].charAt(6) ? a[1].substring(7) : a[1]),
                i = this.mangle("mailto:") + n) : (n = r(a[1]),
                i = n),
                o += this.renderer.link(i, null, n);
            else if (this.inLink || !(a = this.rules.url.exec(e))) {
                if (a = this.rules.tag.exec(e))
                    !this.inLink && /^<a /i.test(a[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(a[0]) && (this.inLink = !1),
                    e = e.substring(a[0].length),
                    o += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(a[0]) : r(a[0]) : a[0];
                else if (a = this.rules.link.exec(e))
                    e = e.substring(a[0].length),
                    this.inLink = !0,
                    o += this.outputLink(a, {
                        href: a[2],
                        title: a[3]
                    }),
                    this.inLink = !1;
                else if ((a = this.rules.reflink.exec(e)) || (a = this.rules.nolink.exec(e))) {
                    if (e = e.substring(a[0].length),
                    t = (a[2] || a[1]).replace(/\s+/g, " "),
                    t = this.links[t.toLowerCase()],
                    !t || !t.href) {
                        o += a[0].charAt(0),
                        e = a[0].substring(1) + e;
                        continue
                    }
                    this.inLink = !0,
                    o += this.outputLink(a, t),
                    this.inLink = !1
                } else if (a = this.rules.strong.exec(e))
                    e = e.substring(a[0].length),
                    o += this.renderer.strong(this.output(a[2] || a[1]));
                else if (a = this.rules.em.exec(e))
                    e = e.substring(a[0].length),
                    o += this.renderer.em(this.output(a[2] || a[1]));
                else if (a = this.rules.code.exec(e))
                    e = e.substring(a[0].length),
                    o += this.renderer.codespan(r(a[2], !0));
                else if (a = this.rules.br.exec(e))
                    e = e.substring(a[0].length),
                    o += this.renderer.br();
                else if (a = this.rules.del.exec(e))
                    e = e.substring(a[0].length),
                    o += this.renderer.del(this.output(a[1]));
                else if (a = this.rules.text.exec(e))
                    e = e.substring(a[0].length),
                    o += this.renderer.text(r(this.smartypants(a[0])));
                else if (e)
                    throw new Error("Infinite loop on byte: " + e.charCodeAt(0))
            } else
                e = e.substring(a[0].length),
                n = r(a[1]),
                i = n,
                o += this.renderer.link(i, null, n);
        return o
    }
    ,
    t.prototype.outputLink = function(e, t) {
        var n = r(t.href)
          , i = t.title ? r(t.title) : null;
        return "!" !== e[0].charAt(0) ? this.renderer.link(n, i, this.output(e[1])) : this.renderer.image(n, i, r(e[1]))
    }
    ,
    t.prototype.smartypants = function(e) {
        return this.options.smartypants ? e.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014\/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g, "$1\u201c").replace(/"/g, "\u201d").replace(/\.{3}/g, "\u2026") : e
    }
    ,
    t.prototype.mangle = function(e) {
        if (!this.options.mangle)
            return e;
        for (var t, n = "", i = e.length, r = 0; i > r; r++)
            t = e.charCodeAt(r),
            Math.random() > .5 && (t = "x" + t.toString(16)),
            n += "&#" + t + ";";
        return n
    }
    ,
    n.prototype.code = function(e, t, n) {
        if (this.options.highlight) {
            var i = this.options.highlight(e, t);
            null != i && i !== e && (n = !0,
            e = i)
        }
        return t ? '<pre><code class="' + this.options.langPrefix + r(t, !0) + '">' + (n ? e : r(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (n ? e : r(e, !0)) + "\n</code></pre>"
    }
    ,
    n.prototype.blockquote = function(e) {
        return "<blockquote>\n" + e + "</blockquote>\n"
    }
    ,
    n.prototype.html = function(e) {
        return e
    }
    ,
    n.prototype.heading = function(e, t, n) {
        return "<h" + t + ' id="' + this.options.headerPrefix + n.toLowerCase().replace(/[^\w]+/g, "-") + '">' + e + "</h" + t + ">\n"
    }
    ,
    n.prototype.hr = function() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
    }
    ,
    n.prototype.list = function(e, t) {
        var n = t ? "ol" : "ul";
        return "<" + n + ">\n" + e + "</" + n + ">\n"
    }
    ,
    n.prototype.listitem = function(e) {
        return "<li>" + e + "</li>\n"
    }
    ,
    n.prototype.paragraph = function(e) {
        return "<p>" + e + "</p>\n"
    }
    ,
    n.prototype.table = function(e, t) {
        return "<table>\n<thead>\n" + e + "</thead>\n<tbody>\n" + t + "</tbody>\n</table>\n"
    }
    ,
    n.prototype.tablerow = function(e) {
        return "<tr>\n" + e + "</tr>\n"
    }
    ,
    n.prototype.tablecell = function(e, t) {
        var n = t.header ? "th" : "td"
          , i = t.align ? "<" + n + ' style="text-align:' + t.align + '">' : "<" + n + ">";
        return i + e + "</" + n + ">\n"
    }
    ,
    n.prototype.strong = function(e) {
        return "<strong>" + e + "</strong>"
    }
    ,
    n.prototype.em = function(e) {
        return "<em>" + e + "</em>"
    }
    ,
    n.prototype.codespan = function(e) {
        return "<code>" + e + "</code>"
    }
    ,
    n.prototype.br = function() {
        return this.options.xhtml ? "<br/>" : "<br>"
    }
    ,
    n.prototype.del = function(e) {
        return "<del>" + e + "</del>"
    }
    ,
    n.prototype.link = function(e, t, n) {
        if (this.options.sanitize) {
            try {
                var i = decodeURIComponent(a(e)).replace(/[^\w:]/g, "").toLowerCase()
            } catch (r) {
                return ""
            }
            if (0 === i.indexOf("javascript:") || 0 === i.indexOf("vbscript:"))
                return ""
        }
        var o = '<a href="' + e + '"';
        return t && (o += ' title="' + t + '"'),
        o += ">" + n + "</a>"
    }
    ,
    n.prototype.image = function(e, t, n) {
        var i = '<img src="' + e + '" alt="' + n + '"';
        return t && (i += ' title="' + t + '"'),
        i += this.options.xhtml ? "/>" : ">"
    }
    ,
    n.prototype.text = function(e) {
        return e
    }
    ,
    i.parse = function(e, t, n) {
        var r = new i(t,n);
        return r.parse(e)
    }
    ,
    i.prototype.parse = function(e) {
        this.inline = new t(e.links,this.options,this.renderer),
        this.tokens = e.reverse();
        for (var n = ""; this.next(); )
            n += this.tok();
        return n
    }
    ,
    i.prototype.next = function() {
        return this.token = this.tokens.pop()
    }
    ,
    i.prototype.peek = function() {
        return this.tokens[this.tokens.length - 1] || 0
    }
    ,
    i.prototype.parseText = function() {
        for (var e = this.token.text; "text" === this.peek().type; )
            e += "\n" + this.next().text;
        return this.inline.output(e)
    }
    ,
    i.prototype.tok = function() {
        switch (this.token.type) {
        case "space":
            return "";
        case "hr":
            return this.renderer.hr();
        case "heading":
            return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
        case "code":
            return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
        case "table":
            var e, t, n, i, r, a = "", o = "";
            for (n = "",
            e = 0; e < this.token.header.length; e++)
                i = {
                    header: !0,
                    align: this.token.align[e]
                },
                n += this.renderer.tablecell(this.inline.output(this.token.header[e]), {
                    header: !0,
                    align: this.token.align[e]
                });
            for (a += this.renderer.tablerow(n),
            e = 0; e < this.token.cells.length; e++) {
                for (t = this.token.cells[e],
                n = "",
                r = 0; r < t.length; r++)
                    n += this.renderer.tablecell(this.inline.output(t[r]), {
                        header: !1,
                        align: this.token.align[r]
                    });
                o += this.renderer.tablerow(n)
            }
            return this.renderer.table(a, o);
        case "blockquote_start":
            for (var o = ""; "blockquote_end" !== this.next().type; )
                o += this.tok();
            return this.renderer.blockquote(o);
        case "list_start":
            for (var o = "", s = this.token.ordered; "list_end" !== this.next().type; )
                o += this.tok();
            return this.renderer.list(o, s);
        case "list_item_start":
            for (var o = ""; "list_item_end" !== this.next().type; )
                o += "text" === this.token.type ? this.parseText() : this.tok();
            return this.renderer.listitem(o);
        case "loose_item_start":
            for (var o = ""; "list_item_end" !== this.next().type; )
                o += this.tok();
            return this.renderer.listitem(o);
        case "html":
            var l = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);
            return this.renderer.html(l);
        case "paragraph":
            return this.renderer.paragraph(this.inline.output(this.token.text));
        case "text":
            return this.renderer.paragraph(this.parseText())
        }
    }
    ,
    s.exec = s,
    c.options = c.setOptions = function(e) {
        return l(c.defaults, e),
        c
    }
    ,
    c.defaults = {
        gfm: !0,
        tables: !0,
        breaks: !1,
        pedantic: !1,
        sanitize: !1,
        sanitizer: null,
        mangle: !0,
        smartLists: !1,
        silent: !1,
        highlight: null,
        langPrefix: "lang-",
        smartypants: !1,
        headerPrefix: "",
        renderer: new n,
        xhtml: !1
    },
    c.Parser = i,
    c.parser = i.parse,
    c.Renderer = n,
    c.Lexer = e,
    c.lexer = e.lex,
    c.InlineLexer = t,
    c.inlineLexer = t.output,
    c.parse = c,
    "undefined" != typeof module && "object" == typeof exports ? module.exports = c : "function" == typeof define && define.amd ? define(function() {
        return c
    }) : this.marked = c
}
.call(function() {
    return this || ("undefined" != typeof window ? window : global)
}()),
!function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.emojify = t()
}(this, function() {
    "use strict";
    var e = function() {
        function e() {
            var e = {
                named: /:([a-z0-9A-Z_-]+):/,
                smile: /:-?\)/g,
                open_mouth: /:o/gi,
                scream: /:-o/gi,
                smirk: /[:;]-?]/g,
                grinning: /[:;]-?d/gi,
                stuck_out_tongue_closed_eyes: /x-d/gi,
                stuck_out_tongue_winking_eye: /[:;]-?p/gi,
                rage: /:-?[\[@]/g,
                frowning: /:-?\(/g,
                sob: /:['\u2019]-?\(|:&#x27;\(/g,
                kissing_heart: /:-?\*/g,
                wink: /;-?\)/g,
                pensive: /:-?\//g,
                confounded: /:-?s/gi,
                flushed: /:-?\|/g,
                relaxed: /:-?\$/g,
                mask: /:-x/gi,
                heart: /<3|&lt;3/g,
                broken_heart: /<\/3|&lt;&#x2F;3/g,
                thumbsup: /:\+1:/g,
                thumbsdown: /:\-1:/g
            };
            return f.ignore_emoticons && (e = {
                named: /:([a-z0-9A-Z_-]+):/,
                thumbsup: /:\+1:/g,
                thumbsdown: /:\-1:/g
            }),
            Object.keys(e).map(function(t) {
                return [e[t], t]
            })
        }
        function t() {
            var e = c.map(function(e) {
                var t = e[0]
                  , n = t.source || t;
                return n = n.replace(/(^|[^\[])\^/g, "$1"),
                "(" + n + ")"
            }).join("|");
            return new RegExp(e,"gi")
        }
        function n(e) {
            return " " === e || "	" === e || "\r" === e || "\n" === e || "" === e || e === String.fromCharCode(160)
        }
        function i(e) {
            var t = null;
            if (e.replacer)
                t = e.replacer.apply({
                    config: f
                }, [":" + e.emojiName + ":", e.emojiName]);
            else {
                var n = f.tag_type || g[f.mode];
                t = e.win.document.createElement(n),
                "img" !== n ? t.setAttribute("class", "emoji emoji-" + e.emojiName) : (t.setAttribute("align", "absmiddle"),
                t.setAttribute("alt", ":" + e.emojiName + ":"),
                t.setAttribute("class", "emoji"),
                t.setAttribute("src", f.img_dir + "/" + e.emojiName + ".png")),
                t.setAttribute("title", ":" + e.emojiName + ":")
            }
            e.node.splitText(e.match.index),
            e.node.nextSibling.nodeValue = e.node.nextSibling.nodeValue.substr(e.match[0].length, e.node.nextSibling.nodeValue.length),
            t.appendChild(e.node.splitText(e.match.index)),
            e.node.parentNode.insertBefore(t, e.node.nextSibling)
        }
        function r(e) {
            if (e[1] && e[2]) {
                var t = e[2];
                if (h[t])
                    return t
            } else
                for (var n = 3; n < e.length - 1; n++)
                    if (e[n])
                        return c[n - 2][1]
        }
        function a(e, t) {
            var n = this.config.tag_type || g[this.config.mode];
            return "img" !== n ? "<" + n + " class='emoji emoji-" + t + "' title=':" + t + ":'></" + n + ">" : "<img align='absmiddle' alt=':" + t + ":' class='emoji' src='" + this.config.img_dir + "/" + t + ".png' title=':" + t + ":' />"
        }
        function o() {
            this.lastEmojiTerminatedAt = -1
        }
        function s(n, i) {
            if (!n)
                return n;
            i || (i = a),
            c = e(),
            u = t();
            var r = new o;
            return n.replace(u, function() {
                var e = Array.prototype.slice.call(arguments, 0, -2)
                  , t = arguments[arguments.length - 2]
                  , n = arguments[arguments.length - 1]
                  , a = r.validate(e, t, n);
                return a ? i.apply({
                    config: f
                }, [arguments[0], a]) : arguments[0]
            })
        }
        function l(n, a) {
            "undefined" == typeof n && (n = f.only_crawl_id ? document.getElementById(f.only_crawl_id) : document.body);
            var s = n.ownerDocument
              , l = s.defaultView || s.parentWindow
              , d = function(e, t) {
                var n;
                if (e.hasChildNodes())
                    for (n = e.firstChild; n; )
                        t(n) && d(n, t),
                        n = n.nextSibling
            }
              , p = function(e) {
                for (var t, n = [], s = new o; null !== (t = u.exec(e.data)); )
                    s.validate(t, t.index, t.input) && n.push(t);
                for (var c = n.length; c-- > 0; ) {
                    var d = r(n[c]);
                    i({
                        node: e,
                        match: n[c],
                        emojiName: d,
                        replacer: a,
                        win: l
                    })
                }
            };
            c = e(),
            u = t();
            var h = []
              , g = new RegExp(f.blacklist.elements.join("|"),"i")
              , m = new RegExp(f.blacklist.classes.join("|"),"i");
            if ("undefined" != typeof l.document.createTreeWalker)
                for (var b, v = l.document.createTreeWalker(n, l.NodeFilter.SHOW_TEXT | l.NodeFilter.SHOW_ELEMENT, function(e) {
                    return 1 !== e.nodeType ? l.NodeFilter.FILTER_ACCEPT : e.tagName.match(g) || "svg" === e.tagName || e.className.match(m) ? l.NodeFilter.FILTER_REJECT : l.NodeFilter.FILTER_SKIP
                }, !1); null !== (b = v.nextNode()); )
                    h.push(b);
            else
                d(n, function(e) {
                    return "undefined" != typeof e.tagName && e.tagName.match(g) || "undefined" != typeof e.className && e.className.match(m) ? !1 : 1 === e.nodeType ? !0 : (h.push(e),
                    !0)
                });
            h.forEach(p)
        }
        var c, u, d = "+1,-1,100,1234,8ball,a,ab,abc,abcd,accept,aerial_tramway,airplane,alarm_clock,alien,ambulance,anchor,angel,anger,angry,anguished,ant,apple,aquarius,aries,arrow_backward,arrow_double_down,arrow_double_up,arrow_down,arrow_down_small,arrow_forward,arrow_heading_down,arrow_heading_up,arrow_left,arrow_lower_left,arrow_lower_right,arrow_right,arrow_right_hook,arrow_up,arrow_up_down,arrow_up_small,arrow_upper_left,arrow_upper_right,arrows_clockwise,arrows_counterclockwise,art,articulated_lorry,astonished,atm,b,baby,baby_bottle,baby_chick,baby_symbol,back,baggage_claim,balloon,ballot_box_with_check,bamboo,banana,bangbang,bank,bar_chart,barber,baseball,basketball,bath,bathtub,battery,bear,bee,beer,beers,beetle,beginner,bell,bento,bicyclist,bike,bikini,bird,birthday,black_circle,black_joker,black_medium_small_square,black_medium_square,black_nib,black_small_square,black_square,black_square_button,blossom,blowfish,blue_book,blue_car,blue_heart,blush,boar,boat,bomb,book,bookmark,bookmark_tabs,books,boom,boot,bouquet,bow,bowling,bowtie,boy,bread,bride_with_veil,bridge_at_night,briefcase,broken_heart,bug,bulb,bullettrain_front,bullettrain_side,bus,busstop,bust_in_silhouette,busts_in_silhouette,cactus,cake,calendar,calling,camel,camera,cancer,candy,capital_abcd,capricorn,car,card_index,carousel_horse,cat,cat2,cd,chart,chart_with_downwards_trend,chart_with_upwards_trend,checkered_flag,cherries,cherry_blossom,chestnut,chicken,children_crossing,chocolate_bar,christmas_tree,church,cinema,circus_tent,city_sunrise,city_sunset,cl,clap,clapper,clipboard,clock1,clock10,clock1030,clock11,clock1130,clock12,clock1230,clock130,clock2,clock230,clock3,clock330,clock4,clock430,clock5,clock530,clock6,clock630,clock7,clock730,clock8,clock830,clock9,clock930,closed_book,closed_lock_with_key,closed_umbrella,cloud,clubs,cn,cocktail,coffee,cold_sweat,collision,computer,confetti_ball,confounded,confused,congratulations,construction,construction_worker,convenience_store,cookie,cool,cop,copyright,corn,couple,couple_with_heart,couplekiss,cow,cow2,credit_card,crescent_moon,crocodile,crossed_flags,crown,cry,crying_cat_face,crystal_ball,cupid,curly_loop,currency_exchange,curry,custard,customs,cyclone,dancer,dancers,dango,dart,dash,date,de,deciduous_tree,department_store,diamond_shape_with_a_dot_inside,diamonds,disappointed,disappointed_relieved,dizzy,dizzy_face,do_not_litter,dog,dog2,dollar,dolls,dolphin,donut,door,doughnut,dragon,dragon_face,dress,dromedary_camel,droplet,dvd,e-mail,ear,ear_of_rice,earth_africa,earth_americas,earth_asia,egg,eggplant,eight,eight_pointed_black_star,eight_spoked_asterisk,electric_plug,elephant,email,end,envelope,es,euro,european_castle,european_post_office,evergreen_tree,exclamation,expressionless,eyeglasses,eyes,facepunch,factory,fallen_leaf,family,fast_forward,fax,fearful,feelsgood,feet,ferris_wheel,file_folder,finnadie,fire,fire_engine,fireworks,first_quarter_moon,first_quarter_moon_with_face,fish,fish_cake,fishing_pole_and_fish,fist,five,flags,flashlight,floppy_disk,flower_playing_cards,flushed,foggy,football,fork_and_knife,fountain,four,four_leaf_clover,fr,free,fried_shrimp,fries,frog,frowning,fu,fuelpump,full_moon,full_moon_with_face,game_die,gb,gem,gemini,ghost,gift,gift_heart,girl,globe_with_meridians,goat,goberserk,godmode,golf,grapes,green_apple,green_book,green_heart,grey_exclamation,grey_question,grimacing,grin,grinning,guardsman,guitar,gun,haircut,hamburger,hammer,hamster,hand,handbag,hankey,hash,hatched_chick,hatching_chick,headphones,hear_no_evil,heart,heart_decoration,heart_eyes,heart_eyes_cat,heartbeat,heartpulse,hearts,heavy_check_mark,heavy_division_sign,heavy_dollar_sign,heavy_exclamation_mark,heavy_minus_sign,heavy_multiplication_x,heavy_plus_sign,helicopter,herb,hibiscus,high_brightness,high_heel,hocho,honey_pot,honeybee,horse,horse_racing,hospital,hotel,hotsprings,hourglass,hourglass_flowing_sand,house,house_with_garden,hurtrealbad,hushed,ice_cream,icecream,id,ideograph_advantage,imp,inbox_tray,incoming_envelope,information_desk_person,information_source,innocent,interrobang,iphone,it,izakaya_lantern,jack_o_lantern,japan,japanese_castle,japanese_goblin,japanese_ogre,jeans,joy,joy_cat,jp,key,keycap_ten,kimono,kiss,kissing,kissing_cat,kissing_closed_eyes,kissing_face,kissing_heart,kissing_smiling_eyes,koala,koko,kr,large_blue_circle,large_blue_diamond,large_orange_diamond,last_quarter_moon,last_quarter_moon_with_face,laughing,leaves,ledger,left_luggage,left_right_arrow,leftwards_arrow_with_hook,lemon,leo,leopard,libra,light_rail,link,lips,lipstick,lock,lock_with_ink_pen,lollipop,loop,loudspeaker,love_hotel,love_letter,low_brightness,m,mag,mag_right,mahjong,mailbox,mailbox_closed,mailbox_with_mail,mailbox_with_no_mail,man,man_with_gua_pi_mao,man_with_turban,mans_shoe,maple_leaf,mask,massage,meat_on_bone,mega,melon,memo,mens,metal,metro,microphone,microscope,milky_way,minibus,minidisc,mobile_phone_off,money_with_wings,moneybag,monkey,monkey_face,monorail,mortar_board,mount_fuji,mountain_bicyclist,mountain_cableway,mountain_railway,mouse,mouse2,movie_camera,moyai,muscle,mushroom,musical_keyboard,musical_note,musical_score,mute,nail_care,name_badge,neckbeard,necktie,negative_squared_cross_mark,neutral_face,new,new_moon,new_moon_with_face,newspaper,ng,nine,no_bell,no_bicycles,no_entry,no_entry_sign,no_good,no_mobile_phones,no_mouth,no_pedestrians,no_smoking,non-potable_water,nose,notebook,notebook_with_decorative_cover,notes,nut_and_bolt,o,o2,ocean,octocat,octopus,oden,office,ok,ok_hand,ok_woman,older_man,older_woman,on,oncoming_automobile,oncoming_bus,oncoming_police_car,oncoming_taxi,one,open_file_folder,open_hands,open_mouth,ophiuchus,orange_book,outbox_tray,ox,package,page_facing_up,page_with_curl,pager,palm_tree,panda_face,paperclip,parking,part_alternation_mark,partly_sunny,passport_control,paw_prints,peach,pear,pencil,pencil2,penguin,pensive,performing_arts,persevere,person_frowning,person_with_blond_hair,person_with_pouting_face,phone,pig,pig2,pig_nose,pill,pineapple,pisces,pizza,plus1,point_down,point_left,point_right,point_up,point_up_2,police_car,poodle,poop,post_office,postal_horn,postbox,potable_water,pouch,poultry_leg,pound,pouting_cat,pray,princess,punch,purple_heart,purse,pushpin,put_litter_in_its_place,question,rabbit,rabbit2,racehorse,radio,radio_button,rage,rage1,rage2,rage3,rage4,railway_car,rainbow,raised_hand,raised_hands,raising_hand,ram,ramen,rat,recycle,red_car,red_circle,registered,relaxed,relieved,repeat,repeat_one,restroom,revolving_hearts,rewind,ribbon,rice,rice_ball,rice_cracker,rice_scene,ring,rocket,roller_coaster,rooster,rose,rotating_light,round_pushpin,rowboat,ru,rugby_football,runner,running,running_shirt_with_sash,sa,sagittarius,sailboat,sake,sandal,santa,satellite,satisfied,saxophone,school,school_satchel,scissors,scorpius,scream,scream_cat,scroll,seat,secret,see_no_evil,seedling,seven,shaved_ice,sheep,shell,ship,shipit,shirt,shit,shoe,shower,signal_strength,six,six_pointed_star,ski,skull,sleeping,sleepy,slot_machine,small_blue_diamond,small_orange_diamond,small_red_triangle,small_red_triangle_down,smile,smile_cat,smiley,smiley_cat,smiling_imp,smirk,smirk_cat,smoking,snail,snake,snowboarder,snowflake,snowman,sob,soccer,soon,sos,sound,space_invader,spades,spaghetti,sparkle,sparkler,sparkles,sparkling_heart,speak_no_evil,speaker,speech_balloon,speedboat,squirrel,star,star2,stars,station,statue_of_liberty,steam_locomotive,stew,straight_ruler,strawberry,stuck_out_tongue,stuck_out_tongue_closed_eyes,stuck_out_tongue_winking_eye,sun_with_face,sunflower,sunglasses,sunny,sunrise,sunrise_over_mountains,surfer,sushi,suspect,suspension_railway,sweat,sweat_drops,sweat_smile,sweet_potato,swimmer,symbols,syringe,tada,tanabata_tree,tangerine,taurus,taxi,tea,telephone,telephone_receiver,telescope,tennis,tent,thought_balloon,three,thumbsdown,thumbsup,ticket,tiger,tiger2,tired_face,tm,toilet,tokyo_tower,tomato,tongue,top,tophat,tractor,traffic_light,train,train2,tram,triangular_flag_on_post,triangular_ruler,trident,triumph,trolleybus,trollface,trophy,tropical_drink,tropical_fish,truck,trumpet,tshirt,tulip,turtle,tv,twisted_rightwards_arrows,two,two_hearts,two_men_holding_hands,two_women_holding_hands,u5272,u5408,u55b6,u6307,u6708,u6709,u6e80,u7121,u7533,u7981,u7a7a,uk,umbrella,unamused,underage,unlock,up,us,v,vertical_traffic_light,vhs,vibration_mode,video_camera,video_game,violin,virgo,volcano,vs,walking,waning_crescent_moon,waning_gibbous_moon,warning,watch,water_buffalo,watermelon,wave,wavy_dash,waxing_crescent_moon,waxing_gibbous_moon,wc,weary,wedding,whale,whale2,wheelchair,white_check_mark,white_circle,white_flower,white_large_square,white_medium_small_square,white_medium_square,white_small_square,white_square_button,wind_chime,wine_glass,wink,wolf,woman,womans_clothes,womans_hat,womens,worried,wrench,x,yellow_heart,yen,yum,zap,zero,zzz", p = d.split(/,/), h = p.reduce(function(e, t) {
            return e[t] = !0,
            e
        }, {}), f = {
            blacklist: {
                ids: [],
                classes: ["no-emojify"],
                elements: ["script", "textarea", "a", "pre", "code"]
            },
            tag_type: null,
            only_crawl_id: null,
            img_dir: "images/emoji",
            ignore_emoticons: !1,
            mode: "img"
        }, g = {
            img: "img",
            sprite: "span",
            "data-uri": "span"
        };
        return o.prototype = {
            validate: function(e, t, i) {
                function a() {
                    return o.lastEmojiTerminatedAt = c + t,
                    s
                }
                var o = this
                  , s = r(e);
                if (s) {
                    var l = e[0]
                      , c = l.length;
                    if (0 === t)
                        return a();
                    if (i.length === l.length + t)
                        return a();
                    var u = this.lastEmojiTerminatedAt === t;
                    if (u)
                        return a();
                    if (n(i.charAt(t - 1)))
                        return a();
                    var d = n(i.charAt(l.length + t));
                    return d && u ? a() : void 0
                }
            }
        },
        {
            defaultConfig: f,
            emojiNames: p,
            setConfig: function(e) {
                Object.keys(f).forEach(function(t) {
                    t in e && (f[t] = e[t])
                })
            },
            replace: s,
            run: l
        }
    }();
    return e
}),
!function(e) {
    if ("function" == typeof define && define.amd)
        define(["jquery"], e);
    else if ("object" == typeof module && module.exports) {
        var t = require("jquery");
        module.exports = e(t)
    } else
        e(jQuery)
}(function(e) {
    if ("undefined" == typeof e)
        throw new Error("jQuery.textcomplete requires jQuery");
    return +function(e) {
        "use strict";
        var t = function(e) {
            console.warn && console.warn(e)
        }
          , n = 1;
        e.fn.textcomplete = function(i, r) {
            var a = Array.prototype.slice.call(arguments);
            return this.each(function() {
                var o = this
                  , s = e(this)
                  , l = s.data("textComplete");
                if (l || (r || (r = {}),
                r._oid = n++,
                l = new e.fn.textcomplete.Completer(this,r),
                s.data("textComplete", l)),
                "string" == typeof i) {
                    if (!l)
                        return;
                    a.shift(),
                    l[i].apply(l, a),
                    "destroy" === i && s.removeData("textComplete")
                } else
                    e.each(i, function(n) {
                        e.each(["header", "footer", "placement", "maxCount"], function(e) {
                            n[e] && (l.option[e] = n[e],
                            t(e + "as a strategy param is deprecated. Use option."),
                            delete n[e])
                        })
                    }),
                    l.register(e.fn.textcomplete.Strategy.parse(i, {
                        el: o,
                        $el: s
                    }))
            })
        }
    }(e),
    +function(e) {
        "use strict";
        function t(n, i) {
            if (this.$el = e(n),
            this.id = "textcomplete" + r++,
            this.strategies = [],
            this.views = [],
            this.option = e.extend({}, t.defaults, i),
            !(this.$el.is("input[type=text]") || this.$el.is("input[type=search]") || this.$el.is("textarea") || n.isContentEditable || "true" == n.contentEditable))
                throw new Error("textcomplete must be called on a Textarea or a ContentEditable.");
            if (n === n.ownerDocument.activeElement)
                this.initialize();
            else {
                var a = this;
                this.$el.one("focus." + this.id, function() {
                    a.initialize()
                }),
                this.option.adapter && "CKEditor" != this.option.adapter || "undefined" == typeof CKEDITOR || !this.$el.is("textarea") || CKEDITOR.on("instanceReady", function(t) {
                    t.editor.once("focus", function() {
                        a.$el = e(t.editor.editable().$),
                        a.option.adapter || (a.option.adapter = e.fn.textcomplete.CKEditor,
                        a.option.ckeditor_instance = t.editor),
                        a.initialize()
                    })
                })
            }
        }
        var n = function(e) {
            var t, n;
            return function() {
                var i = Array.prototype.slice.call(arguments);
                if (t)
                    return void (n = i);
                t = !0;
                var r = this;
                i.unshift(function a() {
                    if (n) {
                        var i = n;
                        n = void 0,
                        i.unshift(a),
                        e.apply(r, i)
                    } else
                        t = !1
                }),
                e.apply(this, i)
            }
        }
          , i = function(e) {
            return "[object String]" === Object.prototype.toString.call(e)
        }
          , r = 0;
        t.defaults = {
            appendTo: "body",
            className: "",
            dropdownClassName: "dropdown-menu textcomplete-dropdown",
            maxCount: 10,
            zIndex: "100",
            rightEdgeOffset: 30
        },
        e.extend(t.prototype, {
            id: null,
            option: null,
            strategies: null,
            adapter: null,
            dropdown: null,
            $el: null,
            $iframe: null,
            initialize: function() {
                var t = this.$el.get(0);
                if (this.$el.prop("ownerDocument") !== document && window.frames.length)
                    for (var n = 0; n < window.frames.length; n++)
                        if (this.$el.prop("ownerDocument") === window.frames[n].document) {
                            this.$iframe = e(window.frames[n].frameElement);
                            break
                        }
                this.dropdown = new e.fn.textcomplete.Dropdown(t,this,this.option);
                var i, r;
                this.option.adapter ? i = this.option.adapter : (r = this.$el.is("textarea") || this.$el.is("input[type=text]") || this.$el.is("input[type=search]") ? "number" == typeof t.selectionEnd ? "Textarea" : "IETextarea" : "ContentEditable",
                i = e.fn.textcomplete[r]),
                this.adapter = new i(t,this,this.option)
            },
            destroy: function() {
                this.$el.off("." + this.id),
                this.adapter && this.adapter.destroy(),
                this.dropdown && this.dropdown.destroy(),
                this.$el = this.adapter = this.dropdown = null
            },
            deactivate: function() {
                this.dropdown && this.dropdown.deactivate()
            },
            trigger: function(e, t) {
                this.dropdown || this.initialize(),
                null != e || (e = this.adapter.getTextFromHeadToCaret());
                var n = this._extractSearchQuery(e);
                if (n.length) {
                    var i = n[1];
                    if (t && this._term === i && "" !== i)
                        return;
                    this._term = i,
                    this._search.apply(this, n)
                } else
                    this._term = null,
                    this.dropdown.deactivate()
            },
            fire: function(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                return this.$el.trigger(e, t),
                this
            },
            register: function(e) {
                Array.prototype.push.apply(this.strategies, e)
            },
            select: function(e, t, n) {
                this._term = null,
                this.adapter.select(e, t, n),
                this.fire("change").fire("textComplete:select", e, t),
                this.adapter.focus()
            },
            _clearAtNext: !0,
            _term: null,
            _extractSearchQuery: function(t) {
                for (var n = 0; n < this.strategies.length; n++) {
                    var r = this.strategies[n]
                      , a = r.context(t);
                    if (a || "" === a) {
                        var o = e.isFunction(r.match) ? r.match(t) : r.match;
                        i(a) && (t = a);
                        var s = t.match(o);
                        if (s)
                            return [r, s[r.index], s]
                    }
                }
                return []
            },
            _search: n(function(e, t, n, i) {
                var r = this;
                t.search(n, function(i, a) {
                    r.dropdown.shown || r.dropdown.activate(),
                    r._clearAtNext && (r.dropdown.clear(),
                    r._clearAtNext = !1),
                    r.dropdown.setPosition(r.adapter.getCaretPosition()),
                    r.dropdown.render(r._zip(i, t, n)),
                    a || (e(),
                    r._clearAtNext = !0)
                }, i)
            }),
            _zip: function(t, n, i) {
                return e.map(t, function(e) {
                    return {
                        value: e,
                        strategy: n,
                        term: i
                    }
                })
            }
        }),
        e.fn.textcomplete.Completer = t
    }(e),
    +function(e) {
        "use strict";
        function t(n, i, a) {
            this.$el = t.createElement(a),
            this.completer = i,
            this.id = i.id + "dropdown",
            this._data = [],
            this.$inputEl = e(n),
            this.option = a,
            a.listPosition && (this.setPosition = a.listPosition),
            a.height && this.$el.height(a.height);
            var o = this;
            e.each(["maxCount", "placement", "footer", "header", "noResultsMessage", "className"], function(e, t) {
                null != a[t] && (o[t] = a[t])
            }),
            this._bindEvents(n),
            r[this.id] = this
        }
        var n = e(window)
          , i = function(e, t) {
            var n, i, r = t.strategy.idProperty;
            for (n = 0; n < e.length; n++)
                if (i = e[n],
                i.strategy === t.strategy)
                    if (r) {
                        if (i.value[r] === t.value[r])
                            return !0
                    } else if (i.value === t.value)
                        return !0;
            return !1
        }
          , r = {};
        e(document).on("click", function(t) {
            var n = t.originalEvent && t.originalEvent.keepTextCompleteDropdown;
            e.each(r, function(e, t) {
                e !== n && t.deactivate()
            })
        });
        var a = {
            SKIP_DEFAULT: 0,
            KEY_UP: 1,
            KEY_DOWN: 2,
            KEY_ENTER: 3,
            KEY_PAGEUP: 4,
            KEY_PAGEDOWN: 5,
            KEY_ESCAPE: 6
        };
        e.extend(t, {
            createElement: function(t) {
                var n = t.appendTo;
                n instanceof e || (n = e(n));
                var i = e("<ul></ul>").addClass(t.dropdownClassName).attr("id", "textcomplete-dropdown-" + t._oid).css({
                    display: "none",
                    left: 0,
                    position: "absolute",
                    zIndex: t.zIndex
                }).appendTo(n);
                return i
            }
        }),
        e.extend(t.prototype, {
            $el: null,
            $inputEl: null,
            completer: null,
            footer: null,
            header: null,
            id: null,
            maxCount: null,
            placement: "",
            shown: !1,
            data: [],
            className: "",
            destroy: function() {
                this.deactivate(),
                this.$el.off("." + this.id),
                this.$inputEl.off("." + this.id),
                this.clear(),
                this.$el.remove(),
                this.$el = this.$inputEl = this.completer = null,
                delete r[this.id]
            },
            render: function(t) {
                var n = this._buildContents(t)
                  , i = e.map(t, function(e) {
                    return e.value
                });
                if (t.length) {
                    var r = t[0].strategy;
                    r.id ? this.$el.attr("data-strategy", r.id) : this.$el.removeAttr("data-strategy"),
                    this._renderHeader(i),
                    this._renderFooter(i),
                    n && (this._renderContents(n),
                    this._fitToBottom(),
                    this._fitToRight(),
                    this._activateIndexedItem()),
                    this._setScroll()
                } else
                    this.noResultsMessage ? this._renderNoResultsMessage(i) : this.shown && this.deactivate()
            },
            setPosition: function(t) {
                var i = "absolute";
                return this.$inputEl.add(this.$inputEl.parents()).each(function() {
                    return "absolute" === e(this).css("position") ? !1 : "fixed" === e(this).css("position") ? (t.top -= n.scrollTop(),
                    t.left -= n.scrollLeft(),
                    i = "fixed",
                    !1) : void 0
                }),
                this.$el.css(this._applyPlacement(t)),
                this.$el.css({
                    position: i
                }),
                this
            },
            clear: function() {
                this.$el.html(""),
                this.data = [],
                this._index = 0,
                this._$header = this._$footer = this._$noResultsMessage = null
            },
            activate: function() {
                return this.shown || (this.clear(),
                this.$el.show(),
                this.className && this.$el.addClass(this.className),
                this.completer.fire("textComplete:show"),
                this.shown = !0),
                this
            },
            deactivate: function() {
                return this.shown && (this.$el.hide(),
                this.className && this.$el.removeClass(this.className),
                this.completer.fire("textComplete:hide"),
                this.shown = !1),
                this
            },
            isUp: function(e) {
                return 38 === e.keyCode || e.ctrlKey && 80 === e.keyCode
            },
            isDown: function(e) {
                return 40 === e.keyCode || e.ctrlKey && 78 === e.keyCode
            },
            isEnter: function(e) {
                var t = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey;
                return !t && (13 === e.keyCode || 9 === e.keyCode || this.option.completeOnSpace === !0 && 32 === e.keyCode)
            },
            isPageup: function(e) {
                return 33 === e.keyCode
            },
            isPagedown: function(e) {
                return 34 === e.keyCode
            },
            isEscape: function(e) {
                return 27 === e.keyCode
            },
            _data: null,
            _index: null,
            _$header: null,
            _$noResultsMessage: null,
            _$footer: null,
            _bindEvents: function() {
                this.$el.on("mousedown." + this.id, ".textcomplete-item", e.proxy(this._onClick, this)),
                this.$el.on("touchstart." + this.id, ".textcomplete-item", e.proxy(this._onClick, this)),
                this.$el.on("mouseover." + this.id, ".textcomplete-item", e.proxy(this._onMouseover, this)),
                this.$inputEl.on("keydown." + this.id, e.proxy(this._onKeydown, this))
            },
            _onClick: function(t) {
                var n = e(t.target);
                t.preventDefault(),
                t.originalEvent.keepTextCompleteDropdown = this.id,
                n.hasClass("textcomplete-item") || (n = n.closest(".textcomplete-item"));
                var i = this.data[parseInt(n.data("index"), 10)];
                this.completer.select(i.value, i.strategy, t);
                var r = this;
                setTimeout(function() {
                    r.deactivate(),
                    "touchstart" === t.type && r.$inputEl.focus()
                }, 0)
            },
            _onMouseover: function(t) {
                var n = e(t.target);
                t.preventDefault(),
                n.hasClass("textcomplete-item") || (n = n.closest(".textcomplete-item")),
                this._index = parseInt(n.data("index"), 10),
                this._activateIndexedItem()
            },
            _onKeydown: function(t) {
                if (this.shown) {
                    var n;
                    switch (e.isFunction(this.option.onKeydown) && (n = this.option.onKeydown(t, a)),
                    null == n && (n = this._defaultKeydown(t)),
                    n) {
                    case a.KEY_UP:
                        t.preventDefault(),
                        this._up();
                        break;
                    case a.KEY_DOWN:
                        t.preventDefault(),
                        this._down();
                        break;
                    case a.KEY_ENTER:
                        t.preventDefault(),
                        this._enter(t);
                        break;
                    case a.KEY_PAGEUP:
                        t.preventDefault(),
                        this._pageup();
                        break;
                    case a.KEY_PAGEDOWN:
                        t.preventDefault(),
                        this._pagedown();
                        break;
                    case a.KEY_ESCAPE:
                        t.preventDefault(),
                        this.deactivate()
                    }
                }
            },
            _defaultKeydown: function(e) {
                return this.isUp(e) ? a.KEY_UP : this.isDown(e) ? a.KEY_DOWN : this.isEnter(e) ? a.KEY_ENTER : this.isPageup(e) ? a.KEY_PAGEUP : this.isPagedown(e) ? a.KEY_PAGEDOWN : this.isEscape(e) ? a.KEY_ESCAPE : void 0
            },
            _up: function() {
                0 === this._index ? this._index = this.data.length - 1 : this._index -= 1,
                this._activateIndexedItem(),
                this._setScroll()
            },
            _down: function() {
                this._index === this.data.length - 1 ? this._index = 0 : this._index += 1,
                this._activateIndexedItem(),
                this._setScroll()
            },
            _enter: function(e) {
                var t = this.data[parseInt(this._getActiveElement().data("index"), 10)];
                this.completer.select(t.value, t.strategy, e),
                this.deactivate()
            },
            _pageup: function() {
                var t = 0
                  , n = this._getActiveElement().position().top - this.$el.innerHeight();
                this.$el.children().each(function(i) {
                    return e(this).position().top + e(this).outerHeight() > n ? (t = i,
                    !1) : void 0
                }),
                this._index = t,
                this._activateIndexedItem(),
                this._setScroll()
            },
            _pagedown: function() {
                var t = this.data.length - 1
                  , n = this._getActiveElement().position().top + this.$el.innerHeight();
                this.$el.children().each(function(i) {
                    return e(this).position().top > n ? (t = i,
                    !1) : void 0
                }),
                this._index = t,
                this._activateIndexedItem(),
                this._setScroll()
            },
            _activateIndexedItem: function() {
                this.$el.find(".textcomplete-item.active").removeClass("active"),
                this._getActiveElement().addClass("active")
            },
            _getActiveElement: function() {
                return this.$el.children(".textcomplete-item:nth(" + this._index + ")")
            },
            _setScroll: function() {
                var e = this._getActiveElement()
                  , t = e.position().top
                  , n = e.outerHeight()
                  , i = this.$el.innerHeight()
                  , r = this.$el.scrollTop();
                0 === this._index || this._index == this.data.length - 1 || 0 > t ? this.$el.scrollTop(t + r) : t + n > i && this.$el.scrollTop(t + n + r - i)
            },
            _buildContents: function(e) {
                var t, n, r, a = "";
                for (n = 0; n < e.length && this.data.length !== this.maxCount; n++)
                    t = e[n],
                    i(this.data, t) || (r = this.data.length,
                    this.data.push(t),
                    a += '<li class="textcomplete-item" data-index="' + r + '"><a>',
                    a += t.strategy.template(t.value, t.term),
                    a += "</a></li>");
                return a
            },
            _renderHeader: function(t) {
                if (this.header) {
                    this._$header || (this._$header = e('<li class="textcomplete-header"></li>').prependTo(this.$el));
                    var n = e.isFunction(this.header) ? this.header(t) : this.header;
                    this._$header.html(n)
                }
            },
            _renderFooter: function(t) {
                if (this.footer) {
                    this._$footer || (this._$footer = e('<li class="textcomplete-footer"></li>').appendTo(this.$el));
                    var n = e.isFunction(this.footer) ? this.footer(t) : this.footer;
                    this._$footer.html(n)
                }
            },
            _renderNoResultsMessage: function(t) {
                if (this.noResultsMessage) {
                    this._$noResultsMessage || (this._$noResultsMessage = e('<li class="textcomplete-no-results-message"></li>').appendTo(this.$el));
                    var n = e.isFunction(this.noResultsMessage) ? this.noResultsMessage(t) : this.noResultsMessage;
                    this._$noResultsMessage.html(n)
                }
            },
            _renderContents: function(e) {
                this._$footer ? this._$footer.before(e) : this.$el.append(e)
            },
            _fitToBottom: function() {
                var e = n.scrollTop() + n.height()
                  , t = this.$el.height();
                this.$el.position().top + t > e && (this.completer.$iframe || this.$el.offset({
                    top: e - t
                }))
            },
            _fitToRight: function() {
                for (var e, t = this.option.rightEdgeOffset, i = this.$el.offset().left, r = this.$el.width(), a = n.width() - t; i + r > a && (this.$el.offset({
                    left: i - t
                }),
                e = this.$el.offset().left,
                !(e >= i)); )
                    i = e
            },
            _applyPlacement: function(e) {
                return -1 !== this.placement.indexOf("top") ? e = {
                    top: "auto",
                    bottom: this.$el.parent().height() - e.top + e.lineHeight,
                    left: e.left
                } : (e.bottom = "auto",
                delete e.lineHeight),
                -1 !== this.placement.indexOf("absleft") ? e.left = 0 : -1 !== this.placement.indexOf("absright") && (e.right = 0,
                e.left = "auto"),
                e
            }
        }),
        e.fn.textcomplete.Dropdown = t,
        e.extend(e.fn.textcomplete, a)
    }(e),
    +function(e) {
        "use strict";
        function t(t) {
            e.extend(this, t),
            this.cache && (this.search = n(this.search))
        }
        var n = function(e) {
            var t = {};
            return function(n, i) {
                t[n] ? i(t[n]) : e.call(this, n, function(e) {
                    t[n] = (t[n] || []).concat(e),
                    i.apply(null, arguments)
                })
            }
        };
        t.parse = function(n, i) {
            return e.map(n, function(e) {
                var n = new t(e);
                return n.el = i.el,
                n.$el = i.$el,
                n
            })
        }
        ,
        e.extend(t.prototype, {
            match: null,
            replace: null,
            search: null,
            id: null,
            cache: !1,
            context: function() {
                return !0
            },
            index: 2,
            template: function(e) {
                return e
            },
            idProperty: null
        }),
        e.fn.textcomplete.Strategy = t
    }(e),
    +function(e) {
        "use strict";
        function t() {}
        var n = Date.now || function() {
            return (new Date).getTime()
        }
          , i = function(e, t) {
            var i, r, a, o, s, l = function() {
                var c = n() - o;
                t > c ? i = setTimeout(l, t - c) : (i = null,
                s = e.apply(a, r),
                a = r = null)
            };
            return function() {
                return a = this,
                r = arguments,
                o = n(),
                i || (i = setTimeout(l, t)),
                s
            }
        };
        e.extend(t.prototype, {
            id: null,
            completer: null,
            el: null,
            $el: null,
            option: null,
            initialize: function(t, n, r) {
                this.el = t,
                this.$el = e(t),
                this.id = n.id + this.constructor.name,
                this.completer = n,
                this.option = r,
                this.option.debounce && (this._onKeyup = i(this._onKeyup, this.option.debounce)),
                this._bindEvents()
            },
            destroy: function() {
                this.$el.off("." + this.id),
                this.$el = this.el = this.completer = null
            },
            select: function() {
                throw new Error("Not implemented")
            },
            getCaretPosition: function() {
                var t = this._getCaretRelativePosition()
                  , n = this.$el.offset()
                  , i = this.option.appendTo;
                if (i) {
                    i instanceof e || (i = e(i));
                    var r = i.offsetParent().offset();
                    n.top -= r.top,
                    n.left -= r.left
                }
                return t.top += n.top,
                t.left += n.left,
                t
            },
            focus: function() {
                this.$el.focus()
            },
            _bindEvents: function() {
                this.$el.on("keyup." + this.id, e.proxy(this._onKeyup, this))
            },
            _onKeyup: function(e) {
                this._skipSearch(e) || this.completer.trigger(this.getTextFromHeadToCaret(), !0)
            },
            _skipSearch: function(e) {
                switch (e.keyCode) {
                case 9:
                case 13:
                case 16:
                case 17:
                case 18:
                case 33:
                case 34:
                case 40:
                case 38:
                case 27:
                    return !0
                }
                if (e.ctrlKey)
                    switch (e.keyCode) {
                    case 78:
                    case 80:
                        return !0
                    }
            }
        }),
        e.fn.textcomplete.Adapter = t
    }(e),
    +function(e) {
        "use strict";
        function t(e, t, n) {
            this.initialize(e, t, n)
        }
        e.extend(t.prototype, e.fn.textcomplete.Adapter.prototype, {
            select: function(t, n, i) {
                var r, a = this.getTextFromHeadToCaret(), o = this.el.value.substring(this.el.selectionEnd), s = n.replace(t, i);
                "undefined" != typeof s && (e.isArray(s) && (o = s[1] + o,
                s = s[0]),
                r = e.isFunction(n.match) ? n.match(a) : n.match,
                a = a.replace(r, s),
                this.$el.val(a + o),
                this.el.selectionStart = this.el.selectionEnd = a.length)
            },
            getTextFromHeadToCaret: function() {
                return this.el.value.substring(0, this.el.selectionEnd)
            },
            _getCaretRelativePosition: function() {
                var t = e.fn.textcomplete.getCaretCoordinates(this.el, this.el.selectionStart);
                return {
                    top: t.top + this._calculateLineHeight() - this.$el.scrollTop(),
                    left: t.left - this.$el.scrollLeft(),
                    lineHeight: this._calculateLineHeight()
                }
            },
            _calculateLineHeight: function() {
                var e = parseInt(this.$el.css("line-height"), 10);
                if (isNaN(e)) {
                    var t = this.el.parentNode
                      , n = document.createElement(this.el.nodeName)
                      , i = this.el.style;
                    n.setAttribute("style", "margin:0px;padding:0px;font-family:" + i.fontFamily + ";font-size:" + i.fontSize),
                    n.innerHTML = "test",
                    t.appendChild(n),
                    e = n.clientHeight,
                    t.removeChild(n)
                }
                return e
            }
        }),
        e.fn.textcomplete.Textarea = t
    }(e),
    +function(e) {
        "use strict";
        function t(t, i, r) {
            this.initialize(t, i, r),
            e("<span>" + n + "</span>").css({
                position: "absolute",
                top: -9999,
                left: -9999
            }).insertBefore(t)
        }
        var n = "\u5436";
        e.extend(t.prototype, e.fn.textcomplete.Textarea.prototype, {
            select: function(t, n, i) {
                var r, a = this.getTextFromHeadToCaret(), o = this.el.value.substring(a.length), s = n.replace(t, i);
                if ("undefined" != typeof s) {
                    e.isArray(s) && (o = s[1] + o,
                    s = s[0]),
                    r = e.isFunction(n.match) ? n.match(a) : n.match,
                    a = a.replace(r, s),
                    this.$el.val(a + o),
                    this.el.focus();
                    var l = this.el.createTextRange();
                    l.collapse(!0),
                    l.moveEnd("character", a.length),
                    l.moveStart("character", a.length),
                    l.select()
                }
            },
            getTextFromHeadToCaret: function() {
                this.el.focus();
                var e = document.selection.createRange();
                e.moveStart("character", -this.el.value.length);
                var t = e.text.split(n);
                return 1 === t.length ? t[0] : t[1]
            }
        }),
        e.fn.textcomplete.IETextarea = t
    }(e),
    +function(e) {
        "use strict";
        function t(e, t, n) {
            this.initialize(e, t, n)
        }
        e.extend(t.prototype, e.fn.textcomplete.Adapter.prototype, {
            select: function(t, n, i) {
                var r = this.getTextFromHeadToCaret()
                  , a = this.el.ownerDocument.getSelection()
                  , o = a.getRangeAt(0)
                  , s = o.cloneRange();
                s.selectNodeContents(o.startContainer);
                var l, c = s.toString(), u = c.substring(o.startOffset), d = n.replace(t, i);
                if ("undefined" != typeof d) {
                    e.isArray(d) && (u = d[1] + u,
                    d = d[0]),
                    l = e.isFunction(n.match) ? n.match(r) : n.match,
                    r = r.replace(l, d).replace(/ $/, "&nbsp"),
                    o.selectNodeContents(o.startContainer),
                    o.deleteContents();
                    var p = this.el.ownerDocument.createElement("div");
                    p.innerHTML = r;
                    var h = this.el.ownerDocument.createElement("div");
                    h.innerHTML = u;
                    for (var f, g, m = this.el.ownerDocument.createDocumentFragment(); f = p.firstChild; )
                        g = m.appendChild(f);
                    for (; f = h.firstChild; )
                        m.appendChild(f);
                    o.insertNode(m),
                    o.setStartAfter(g),
                    o.collapse(!0),
                    a.removeAllRanges(),
                    a.addRange(o)
                }
            },
            _getCaretRelativePosition: function() {
                var t = this.el.ownerDocument.getSelection().getRangeAt(0).cloneRange()
                  , n = this.el.ownerDocument.createElement("span");
                t.insertNode(n),
                t.selectNodeContents(n),
                t.deleteContents();
                var i = e(n)
                  , r = i.offset();
                if (r.left -= this.$el.offset().left,
                r.top += i.height() - this.$el.offset().top,
                r.lineHeight = i.height(),
                this.completer.$iframe) {
                    var a = this.completer.$iframe.offset();
                    r.top += a.top,
                    r.left += a.left,
                    r.top -= this.$el.scrollTop()
                }
                return i.remove(),
                r
            },
            getTextFromHeadToCaret: function() {
                var e = this.el.ownerDocument.getSelection().getRangeAt(0)
                  , t = e.cloneRange();
                return t.selectNodeContents(e.startContainer),
                t.toString().substring(0, e.startOffset)
            }
        }),
        e.fn.textcomplete.ContentEditable = t
    }(e),
    +function(e) {
        "use strict";
        function t(e, t, n) {
            this.initialize(e, t, n)
        }
        e.extend(t.prototype, e.fn.textcomplete.ContentEditable.prototype, {
            _bindEvents: function() {
                var t = this;
                this.option.ckeditor_instance.on("key", function(e) {
                    var n = e.data;
                    return t._onKeyup(n),
                    t.completer.dropdown.shown && t._skipSearch(n) ? !1 : void 0
                }, null, null, 1),
                this.$el.on("keyup." + this.id, e.proxy(this._onKeyup, this))
            }
        }),
        e.fn.textcomplete.CKEditor = t
    }(e),
    function(e) {
        function t(e, t, a) {
            if (!i)
                throw new Error("textarea-caret-position#getCaretCoordinates should only be called in a browser");
            var o = a && a.debug || !1;
            if (o) {
                var s = document.querySelector("#input-textarea-caret-position-mirror-div");
                s && s.parentNode.removeChild(s)
            }
            var l = document.createElement("div");
            l.id = "input-textarea-caret-position-mirror-div",
            document.body.appendChild(l);
            var c = l.style
              , u = window.getComputedStyle ? getComputedStyle(e) : e.currentStyle;
            c.whiteSpace = "pre-wrap",
            "INPUT" !== e.nodeName && (c.wordWrap = "break-word"),
            c.position = "absolute",
            o || (c.visibility = "hidden"),
            n.forEach(function(e) {
                c[e] = u[e]
            }),
            r ? e.scrollHeight > parseInt(u.height) && (c.overflowY = "scroll") : c.overflow = "hidden",
            l.textContent = e.value.substring(0, t),
            "INPUT" === e.nodeName && (l.textContent = l.textContent.replace(/\s/g, "\xa0"));
            var d = document.createElement("span");
            d.textContent = e.value.substring(t) || ".",
            l.appendChild(d);
            var p = {
                top: d.offsetTop + parseInt(u.borderTopWidth),
                left: d.offsetLeft + parseInt(u.borderLeftWidth)
            };
            return o ? d.style.backgroundColor = "#aaa" : document.body.removeChild(l),
            p
        }
        var n = ["direction", "boxSizing", "width", "height", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize"]
          , i = "undefined" != typeof window
          , r = i && null != window.mozInnerScreenX;
        e.fn.textcomplete.getCaretCoordinates = t
    }(e),
    e
}),
!function(e) {
    "undefined" != typeof exports ? e(exports) : (self.hljs = e({}),
    "function" == typeof define && define.amd && define("hljs", [], function() {
        return self.hljs
    }))
}(function(e) {
    function t(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }
    function n(e) {
        return e.nodeName.toLowerCase()
    }
    function i(e, t) {
        var n = e && e.exec(t);
        return n && 0 == n.index
    }
    function r(e) {
        return /^(no-?highlight|plain|text)$/i.test(e)
    }
    function a(e) {
        var t, n, i, a = e.className + " ";
        if (a += e.parentNode ? e.parentNode.className : "",
        n = /\blang(?:uage)?-([\w-]+)\b/i.exec(a))
            return _(n[1]) ? n[1] : "no-highlight";
        for (a = a.split(/\s+/),
        t = 0,
        i = a.length; i > t; t++)
            if (_(a[t]) || r(a[t]))
                return a[t]
    }
    function o(e, t) {
        var n, i = {};
        for (n in e)
            i[n] = e[n];
        if (t)
            for (n in t)
                i[n] = t[n];
        return i
    }
    function s(e) {
        var t = [];
        return function i(e, r) {
            for (var a = e.firstChild; a; a = a.nextSibling)
                3 == a.nodeType ? r += a.nodeValue.length : 1 == a.nodeType && (t.push({
                    event: "start",
                    offset: r,
                    node: a
                }),
                r = i(a, r),
                n(a).match(/br|hr|img|input/) || t.push({
                    event: "stop",
                    offset: r,
                    node: a
                }));
            return r
        }(e, 0),
        t
    }
    function l(e, i, r) {
        function a() {
            return e.length && i.length ? e[0].offset != i[0].offset ? e[0].offset < i[0].offset ? e : i : "start" == i[0].event ? e : i : e.length ? e : i
        }
        function o(e) {
            function i(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }
            u += "<" + n(e) + Array.prototype.map.call(e.attributes, i).join("") + ">"
        }
        function s(e) {
            u += "</" + n(e) + ">"
        }
        function l(e) {
            ("start" == e.event ? o : s)(e.node)
        }
        for (var c = 0, u = "", d = []; e.length || i.length; ) {
            var p = a();
            if (u += t(r.substr(c, p[0].offset - c)),
            c = p[0].offset,
            p == e) {
                d.reverse().forEach(s);
                do
                    l(p.splice(0, 1)[0]),
                    p = a();
                while (p == e && p.length && p[0].offset == c);
                d.reverse().forEach(o)
            } else
                "start" == p[0].event ? d.push(p[0].node) : d.pop(),
                l(p.splice(0, 1)[0])
        }
        return u + t(r.substr(c))
    }
    function c(e) {
        function t(e) {
            return e && e.source || e
        }
        function n(n, i) {
            return new RegExp(t(n),"m" + (e.cI ? "i" : "") + (i ? "g" : ""))
        }
        function i(r, a) {
            if (!r.compiled) {
                if (r.compiled = !0,
                r.k = r.k || r.bK,
                r.k) {
                    var s = {}
                      , l = function(t, n) {
                        e.cI && (n = n.toLowerCase()),
                        n.split(" ").forEach(function(e) {
                            var n = e.split("|");
                            s[n[0]] = [t, n[1] ? Number(n[1]) : 1]
                        })
                    };
                    "string" == typeof r.k ? l("keyword", r.k) : Object.keys(r.k).forEach(function(e) {
                        l(e, r.k[e])
                    }),
                    r.k = s
                }
                r.lR = n(r.l || /\b\w+\b/, !0),
                a && (r.bK && (r.b = "\\b(" + r.bK.split(" ").join("|") + ")\\b"),
                r.b || (r.b = /\B|\b/),
                r.bR = n(r.b),
                r.e || r.eW || (r.e = /\B|\b/),
                r.e && (r.eR = n(r.e)),
                r.tE = t(r.e) || "",
                r.eW && a.tE && (r.tE += (r.e ? "|" : "") + a.tE)),
                r.i && (r.iR = n(r.i)),
                void 0 === r.r && (r.r = 1),
                r.c || (r.c = []);
                var c = [];
                r.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(t) {
                        c.push(o(e, t))
                    }) : c.push("self" == e ? r : e)
                }),
                r.c = c,
                r.c.forEach(function(e) {
                    i(e, r)
                }),
                r.starts && i(r.starts, a);
                var u = r.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([r.tE, r.i]).map(t).filter(Boolean);
                r.t = u.length ? n(u.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }
            }
        }
        i(e)
    }
    function u(e, n, r, a) {
        function o(e, t) {
            for (var n = 0; n < t.c.length; n++)
                if (i(t.c[n].bR, e))
                    return t.c[n]
        }
        function s(e, t) {
            if (i(e.eR, t)) {
                for (; e.endsParent && e.parent; )
                    e = e.parent;
                return e
            }
            return e.eW ? s(e.parent, t) : void 0
        }
        function l(e, t) {
            return !r && i(t.iR, e)
        }
        function p(e, t) {
            var n = y.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(n) && e.k[n]
        }
        function h(e, t, n, i) {
            var r = i ? "" : w.classPrefix
              , a = '<span class="' + r
              , o = n ? "" : "</span>";
            return a += e + '">',
            a + t + o
        }
        function f() {
            if (!C.k)
                return t(E);
            var e = ""
              , n = 0;
            C.lR.lastIndex = 0;
            for (var i = C.lR.exec(E); i; ) {
                e += t(E.substr(n, i.index - n));
                var r = p(C, i);
                r ? (D += r[1],
                e += h(r[0], t(i[0]))) : e += t(i[0]),
                n = C.lR.lastIndex,
                i = C.lR.exec(E)
            }
            return e + t(E.substr(n))
        }
        function g() {
            var e = "string" == typeof C.sL;
            if (e && !x[C.sL])
                return t(E);
            var n = e ? u(C.sL, E, !0, T[C.sL]) : d(E, C.sL.length ? C.sL : void 0);
            return C.r > 0 && (D += n.r),
            e && (T[C.sL] = n.top),
            h(n.language, n.value, !1, !0)
        }
        function m() {
            return void 0 !== C.sL ? g() : f()
        }
        function b(e, n) {
            var i = e.cN ? h(e.cN, "", !0) : "";
            e.rB ? (N += i,
            E = "") : e.eB ? (N += t(n) + i,
            E = "") : (N += i,
            E = n),
            C = Object.create(e, {
                parent: {
                    value: C
                }
            })
        }
        function v(e, n) {
            if (E += e,
            void 0 === n)
                return N += m(),
                0;
            var i = o(n, C);
            if (i)
                return N += m(),
                b(i, n),
                i.rB ? 0 : n.length;
            var r = s(C, n);
            if (r) {
                var a = C;
                a.rE || a.eE || (E += n),
                N += m();
                do
                    C.cN && (N += "</span>"),
                    D += C.r,
                    C = C.parent;
                while (C != r.parent);
                return a.eE && (N += t(n)),
                E = "",
                r.starts && b(r.starts, ""),
                a.rE ? 0 : n.length
            }
            if (l(n, C))
                throw new Error('Illegal lexeme "' + n + '" for mode "' + (C.cN || "<unnamed>") + '"');
            return E += n,
            n.length || 1
        }
        var y = _(e);
        if (!y)
            throw new Error('Unknown language: "' + e + '"');
        c(y);
        var k, C = a || y, T = {}, N = "";
        for (k = C; k != y; k = k.parent)
            k.cN && (N = h(k.cN, "", !0) + N);
        var E = ""
          , D = 0;
        try {
            for (var $, S, A = 0; C.t.lastIndex = A,
            $ = C.t.exec(n),
            $; )
                S = v(n.substr(A, $.index - A), $[0]),
                A = $.index + S;
            for (v(n.substr(A)),
            k = C; k.parent; k = k.parent)
                k.cN && (N += "</span>");
            return {
                r: D,
                value: N,
                language: e,
                top: C
            }
        } catch (M) {
            if (-1 != M.message.indexOf("Illegal"))
                return {
                    r: 0,
                    value: t(n)
                };
            throw M
        }
    }
    function d(e, n) {
        n = n || w.languages || Object.keys(x);
        var i = {
            r: 0,
            value: t(e)
        }
          , r = i;
        return n.forEach(function(t) {
            if (_(t)) {
                var n = u(t, e, !1);
                n.language = t,
                n.r > r.r && (r = n),
                n.r > i.r && (r = i,
                i = n)
            }
        }),
        r.language && (i.second_best = r),
        i
    }
    function p(e) {
        return w.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
            return t.replace(/\t/g, w.tabReplace)
        })),
        w.useBR && (e = e.replace(/\n/g, "<br>")),
        e
    }
    function h(e, t, n) {
        var i = t ? k[t] : n
          , r = [e.trim()];
        return e.match(/\bhljs\b/) || r.push("hljs"),
        -1 === e.indexOf(i) && r.push(i),
        r.join(" ").trim()
    }
    function f(e) {
        var t = a(e);
        if (!r(t)) {
            var n;
            w.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"),
            n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e;
            var i = n.textContent
              , o = t ? u(t, i, !0) : d(i)
              , c = s(n);
            if (c.length) {
                var f = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                f.innerHTML = o.value,
                o.value = l(c, s(f), i)
            }
            o.value = p(o.value),
            e.innerHTML = o.value,
            e.className = h(e.className, t, o.language),
            e.result = {
                language: o.language,
                re: o.r
            },
            o.second_best && (e.second_best = {
                language: o.second_best.language,
                re: o.second_best.r
            })
        }
    }
    function g(e) {
        w = o(w, e)
    }
    function m() {
        if (!m.called) {
            m.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, f)
        }
    }
    function b() {
        addEventListener("DOMContentLoaded", m, !1),
        addEventListener("load", m, !1)
    }
    function v(t, n) {
        var i = x[t] = n(e);
        i.aliases && i.aliases.forEach(function(e) {
            k[e] = t
        })
    }
    function y() {
        return Object.keys(x)
    }
    function _(e) {
        return e = (e || "").toLowerCase(),
        x[e] || x[k[e]]
    }
    var w = {
        classPrefix: "hljs-",
        tabReplace: null,
        useBR: !1,
        languages: void 0
    }
      , x = {}
      , k = {};
    return e.highlight = u,
    e.highlightAuto = d,
    e.fixMarkup = p,
    e.highlightBlock = f,
    e.configure = g,
    e.initHighlighting = m,
    e.initHighlightingOnLoad = b,
    e.registerLanguage = v,
    e.listLanguages = y,
    e.getLanguage = _,
    e.inherit = o,
    e.IR = "[a-zA-Z]\\w*",
    e.UIR = "[a-zA-Z_]\\w*",
    e.NR = "\\b\\d+(\\.\\d+)?",
    e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
    e.BNR = "\\b(0b[01]+)",
    e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    },
    e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    },
    e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    },
    e.PWM = {
        b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/
    },
    e.C = function(t, n, i) {
        var r = e.inherit({
            cN: "comment",
            b: t,
            e: n,
            c: []
        }, i || {});
        return r.c.push(e.PWM),
        r.c.push({
            cN: "doctag",
            b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            r: 0
        }),
        r
    }
    ,
    e.CLCM = e.C("//", "$"),
    e.CBCM = e.C("/\\*", "\\*/"),
    e.HCM = e.C("#", "$"),
    e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    },
    e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    },
    e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    },
    e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    },
    e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    },
    e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    },
    e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    },
    e
}),
hljs.registerLanguage("python", function(e) {
    var t = {
        cN: "meta",
        b: /^(>>>|\.\.\.) /
    }
      , n = {
        cN: "string",
        c: [e.BE],
        v: [{
            b: /(u|b)?r?'''/,
            e: /'''/,
            c: [t],
            r: 10
        }, {
            b: /(u|b)?r?"""/,
            e: /"""/,
            c: [t],
            r: 10
        }, {
            b: /(u|r|ur)'/,
            e: /'/,
            r: 10
        }, {
            b: /(u|r|ur)"/,
            e: /"/,
            r: 10
        }, {
            b: /(b|br)'/,
            e: /'/
        }, {
            b: /(b|br)"/,
            e: /"/
        }, e.ASM, e.QSM]
    }
      , i = {
        cN: "number",
        r: 0,
        v: [{
            b: e.BNR + "[lLjJ]?"
        }, {
            b: "\\b(0o[0-7]+)[lLjJ]?"
        }, {
            b: e.CNR + "[lLjJ]?"
        }]
    }
      , r = {
        cN: "params",
        b: /\(/,
        e: /\)/,
        c: ["self", t, i, n]
    };
    return {
        aliases: ["py", "gyp"],
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        i: /(<\/|->|\?)/,
        c: [t, i, n, e.HCM, {
            v: [{
                cN: "function",
                bK: "def",
                r: 10
            }, {
                cN: "class",
                bK: "class"
            }],
            e: /:/,
            i: /[${=;\n,]/,
            c: [e.UTM, r]
        }, {
            cN: "meta",
            b: /^[\t ]*@/,
            e: /$/
        }, {
            b: /\b(print|exec)\(/
        }]
    }
}),
hljs.registerLanguage("makefile", function(e) {
    var t = {
        cN: "variable",
        b: /\$\(/,
        e: /\)/,
        c: [e.BE]
    };
    return {
        aliases: ["mk", "mak"],
        c: [e.HCM, {
            b: /^\w+\s*\W*=/,
            rB: !0,
            r: 0,
            starts: {
                e: /\s*\W*=/,
                eE: !0,
                starts: {
                    e: /$/,
                    r: 0,
                    c: [t]
                }
            }
        }, {
            cN: "section",
            b: /^[\w]+:\s*$/
        }, {
            cN: "meta",
            b: /^\.PHONY:/,
            e: /$/,
            k: {
                "meta-keyword": ".PHONY"
            },
            l: /[\.\w]+/
        }, {
            b: /^\t+/,
            e: /$/,
            r: 0,
            c: [e.QSM, t]
        }]
    }
}),
hljs.registerLanguage("perl", function(e) {
    var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when"
      , n = {
        cN: "subst",
        b: "[$@]\\{",
        e: "\\}",
        k: t
    }
      , i = {
        b: "->{",
        e: "}"
    }
      , r = {
        v: [{
            b: /\$\d/
        }, {
            b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
        }, {
            b: /[\$%@][^\s\w{]/,
            r: 0
        }]
    }
      , a = [e.BE, n, r]
      , o = [r, e.HCM, e.C("^\\=\\w", "\\=cut", {
        eW: !0
    }), i, {
        cN: "string",
        c: a,
        v: [{
            b: "q[qwxr]?\\s*\\(",
            e: "\\)",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\[",
            e: "\\]",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\{",
            e: "\\}",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\|",
            e: "\\|",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\<",
            e: "\\>",
            r: 5
        }, {
            b: "qw\\s+q",
            e: "q",
            r: 5
        }, {
            b: "'",
            e: "'",
            c: [e.BE]
        }, {
            b: '"',
            e: '"'
        }, {
            b: "`",
            e: "`",
            c: [e.BE]
        }, {
            b: "{\\w+}",
            c: [],
            r: 0
        }, {
            b: "-?\\w+\\s*\\=\\>",
            c: [],
            r: 0
        }]
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
        k: "split return print reverse grep",
        r: 0,
        c: [e.HCM, {
            cN: "regexp",
            b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
            r: 10
        }, {
            cN: "regexp",
            b: "(m|qr)?/",
            e: "/[a-z]*",
            c: [e.BE],
            r: 0
        }]
    }, {
        cN: "function",
        bK: "sub",
        e: "(\\s*\\(.*?\\))?[;{]",
        eE: !0,
        r: 5,
        c: [e.TM]
    }, {
        b: "-\\w\\b",
        r: 0
    }, {
        b: "^__DATA__$",
        e: "^__END__$",
        sL: "mojolicious",
        c: [{
            b: "^@@.*",
            e: "$",
            cN: "comment"
        }]
    }];
    return n.c = o,
    i.c = o,
    {
        aliases: ["pl"],
        k: t,
        c: o
    }
}),
hljs.registerLanguage("java", function(e) {
    var t = e.UIR + "(<(" + e.UIR + "|\\s*,\\s*)+>)?"
      , n = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private"
      , i = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?"
      , r = {
        cN: "number",
        b: i,
        r: 0
    };
    return {
        aliases: ["jsp"],
        k: n,
        i: /<\/|#/,
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                b: /\w+@/,
                r: 0
            }, {
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
            cN: "class",
            bK: "class interface",
            e: /[{;=]/,
            eE: !0,
            k: "class interface",
            i: /[:"\[\]]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "new throw return else",
            r: 0
        }, {
            cN: "function",
            b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: n,
            c: [{
                b: e.UIR + "\\s*\\(",
                rB: !0,
                r: 0,
                c: [e.UTM]
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: n,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }, r, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }]
    }
}),
hljs.registerLanguage("typescript", function(e) {
    var t = {
        keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class public private protected get set super static implements enum export import declare type namespace abstract",
        literal: "true false null undefined NaN Infinity",
        built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document any number boolean string void"
    };
    return {
        aliases: ["ts"],
        k: t,
        c: [{
            cN: "meta",
            b: /^\s*['"]use strict['"]/
        }, e.ASM, e.QSM, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE, {
                cN: "subst",
                b: "\\$\\{",
                e: "\\}"
            }]
        }, e.CLCM, e.CBCM, {
            cN: "number",
            v: [{
                b: "\\b(0[bB][01]+)"
            }, {
                b: "\\b(0[oO][0-7]+)"
            }, {
                b: e.CNR
            }],
            r: 0
        }, {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBCM, e.RM],
            r: 0
        }, {
            cN: "function",
            b: "function",
            e: /[\{;]/,
            eE: !0,
            k: t,
            c: ["self", e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                k: t,
                c: [e.CLCM, e.CBCM],
                i: /["'\(]/
            }],
            i: /\[|%/,
            r: 0
        }, {
            bK: "constructor",
            e: /\{/,
            eE: !0
        }, {
            bK: "module",
            e: /\{/,
            eE: !0
        }, {
            bK: "interface",
            e: /\{/,
            eE: !0,
            k: "interface extends"
        }, {
            b: /\$[(.]/
        }, {
            b: "\\." + e.IR,
            r: 0
        }]
    }
}),
hljs.registerLanguage("ruby", function(e) {
    var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"
      , n = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor"
      , i = {
        cN: "doctag",
        b: "@[A-Za-z]+"
    }
      , r = {
        b: "#<",
        e: ">"
    }
      , a = [e.C("#", "$", {
        c: [i]
    }), e.C("^\\=begin", "^\\=end", {
        c: [i],
        r: 10
    }), e.C("^__END__", "\\n$")]
      , o = {
        cN: "subst",
        b: "#\\{",
        e: "}",
        k: n
    }
      , s = {
        cN: "string",
        c: [e.BE, o],
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }, {
            b: /`/,
            e: /`/
        }, {
            b: "%[qQwWx]?\\(",
            e: "\\)"
        }, {
            b: "%[qQwWx]?\\[",
            e: "\\]"
        }, {
            b: "%[qQwWx]?{",
            e: "}"
        }, {
            b: "%[qQwWx]?<",
            e: ">"
        }, {
            b: "%[qQwWx]?/",
            e: "/"
        }, {
            b: "%[qQwWx]?%",
            e: "%"
        }, {
            b: "%[qQwWx]?-",
            e: "-"
        }, {
            b: "%[qQwWx]?\\|",
            e: "\\|"
        }, {
            b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
        }]
    }
      , l = {
        cN: "params",
        b: "\\(",
        e: "\\)",
        endsParent: !0,
        k: n
    }
      , c = [s, r, {
        cN: "class",
        bK: "class module",
        e: "$|;",
        i: /=/,
        c: [e.inherit(e.TM, {
            b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        }), {
            b: "<\\s*",
            c: [{
                b: "(" + e.IR + "::)?" + e.IR
            }]
        }].concat(a)
    }, {
        cN: "function",
        bK: "def",
        e: "$|;",
        c: [e.inherit(e.TM, {
            b: t
        }), l].concat(a)
    }, {
        cN: "symbol",
        b: e.UIR + "(\\!|\\?)?:",
        r: 0
    }, {
        cN: "symbol",
        b: ":",
        c: [s, {
            b: t
        }],
        r: 0
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, {
        b: "(" + e.RSR + ")\\s*",
        c: [r, {
            cN: "regexp",
            c: [e.BE, o],
            i: /\n/,
            v: [{
                b: "/",
                e: "/[a-z]*"
            }, {
                b: "%r{",
                e: "}[a-z]*"
            }, {
                b: "%r\\(",
                e: "\\)[a-z]*"
            }, {
                b: "%r!",
                e: "![a-z]*"
            }, {
                b: "%r\\[",
                e: "\\][a-z]*"
            }]
        }].concat(a),
        r: 0
    }].concat(a);
    o.c = c,
    l.c = c;
    var u = "[>?]>"
      , d = "[\\w#]+\\(\\w+\\):\\d+:\\d+>"
      , p = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>"
      , h = [{
        b: /^\s*=>/,
        starts: {
            e: "$",
            c: c
        }
    }, {
        cN: "meta",
        b: "^(" + u + "|" + d + "|" + p + ")",
        starts: {
            e: "$",
            c: c
        }
    }];
    return {
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        k: n,
        i: /\/\*/,
        c: a.concat(h).concat(c)
    }
}),
hljs.registerLanguage("sql", function(e) {
    var t = e.C("--", "$");
    return {
        cI: !0,
        i: /[<>{}*]/,
        c: [{
            bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
            e: /;/,
            eW: !0,
            k: {
                keyword: "abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes c cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle d data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration e each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract f failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function g general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http i id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists k keep keep_duplicates key keys kill l language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim m main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex n name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding p package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime t table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
                literal: "true false null",
                built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
            },
            c: [{
                cN: "string",
                b: "'",
                e: "'",
                c: [e.BE, {
                    b: "''"
                }]
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [e.BE, {
                    b: '""'
                }]
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [e.BE]
            }, e.CNM, e.CBCM, t]
        }, e.CBCM, t]
    }
}),
hljs.registerLanguage("bash", function(e) {
    var t = {
        cN: "variable",
        v: [{
            b: /\$[\w\d#@][\w\d_]*/
        }, {
            b: /\$\{(.*?)}/
        }]
    }
      , n = {
        cN: "string",
        b: /"/,
        e: /"/,
        c: [e.BE, t, {
            cN: "variable",
            b: /\$\(/,
            e: /\)/,
            c: [e.BE]
        }]
    }
      , i = {
        cN: "string",
        b: /'/,
        e: /'/
    };
    return {
        aliases: ["sh", "zsh"],
        l: /-?[a-z\.]+/,
        k: {
            keyword: "if then else elif fi for while in do done case esac function",
            literal: "true false",
            built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
            _: "-ne -eq -lt -gt -f -d -e -s -l -a"
        },
        c: [{
            cN: "meta",
            b: /^#![^\n]+sh\s*$/,
            r: 10
        }, {
            cN: "function",
            b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            rB: !0,
            c: [e.inherit(e.TM, {
                b: /\w[\w\d_]*/
            })],
            r: 0
        }, e.HCM, n, i, t]
    }
}),
hljs.registerLanguage("xml", function(e) {
    var t = "[A-Za-z0-9\\._:-]+"
      , n = {
        b: /<\?(php)?(?!\w)/,
        e: /\?>/,
        sL: "php"
    }
      , i = {
        eW: !0,
        i: /</,
        r: 0,
        c: [n, {
            cN: "attr",
            b: t,
            r: 0
        }, {
            b: "=",
            r: 0,
            c: [{
                cN: "string",
                c: [n],
                v: [{
                    b: /"/,
                    e: /"/
                }, {
                    b: /'/,
                    e: /'/
                }, {
                    b: /[^\s\/>]+/
                }]
            }]
        }]
    };
    return {
        aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
        cI: !0,
        c: [{
            cN: "meta",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, e.C("<!--", "-->", {
            r: 10
        }), {
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                name: "style"
            },
            c: [i],
            starts: {
                e: "</style>",
                rE: !0,
                sL: ["css", "xml"]
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                name: "script"
            },
            c: [i],
            starts: {
                e: "</script>",
                rE: !0,
                sL: ["actionscript", "javascript", "handlebars", "xml"]
            }
        }, n, {
            cN: "meta",
            b: /<\?\w+/,
            e: /\?>/,
            r: 10
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "name",
                b: /[^\/><\s]+/,
                r: 0
            }, i]
        }]
    }
}),
hljs.registerLanguage("ocaml", function(e) {
    return {
        aliases: ["ml"],
        k: {
            keyword: "and as assert asr begin class constraint do done downto else end exception external for fun function functor if in include inherit! inherit initializer land lazy let lor lsl lsr lxor match method!|10 method mod module mutable new object of open! open or private rec sig struct then to try type val! val virtual when while with parser value",
            built_in: "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 string unit in_channel out_channel ref",
            literal: "true false"
        },
        i: /\/\/|>>/,
        l: "[a-z_]\\w*!?",
        c: [{
            cN: "literal",
            b: "\\[(\\|\\|)?\\]|\\(\\)",
            r: 0
        }, e.C("\\(\\*", "\\*\\)", {
            c: ["self"]
        }), {
            cN: "symbol",
            b: "'[A-Za-z_](?!')[\\w']*"
        }, {
            cN: "type",
            b: "`[A-Z][\\w']*"
        }, {
            cN: "type",
            b: "\\b[A-Z][\\w']*",
            r: 0
        }, {
            b: "[a-z_]\\w*'[\\w']*",
            r: 0
        }, e.inherit(e.ASM, {
            cN: "string",
            r: 0
        }), e.inherit(e.QSM, {
            i: null
        }), {
            cN: "number",
            b: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
            r: 0
        }, {
            b: /[-=]>/
        }]
    }
}),
hljs.registerLanguage("lua", function(e) {
    var t = "\\[=*\\["
      , n = "\\]=*\\]"
      , i = {
        b: t,
        e: n,
        c: ["self"]
    }
      , r = [e.C("--(?!" + t + ")", "$"), e.C("--" + t, n, {
        c: [i],
        r: 10
    })];
    return {
        l: e.UIR,
        k: {
            keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while",
            built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
        },
        c: r.concat([{
            cN: "function",
            bK: "function",
            e: "\\)",
            c: [e.inherit(e.TM, {
                b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
            }), {
                cN: "params",
                b: "\\(",
                eW: !0,
                c: r
            }].concat(r)
        }, e.CNM, e.ASM, e.QSM, {
            cN: "string",
            b: t,
            e: n,
            c: [i],
            r: 5
        }])
    }
}),
hljs.registerLanguage("r", function(e) {
    var t = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
    return {
        c: [e.HCM, {
            b: t,
            l: t,
            k: {
                keyword: "function if in break next repeat else for return switch while try tryCatch stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...",
                literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"
            },
            r: 0
        }, {
            cN: "number",
            b: "0[xX][0-9a-fA-F]+[Li]?\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\d+\\.(?!\\d)(?:i\\b)?",
            r: 0
        }, {
            cN: "number",
            b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
            r: 0
        }, {
            b: "`",
            e: "`",
            r: 0
        }, {
            cN: "string",
            c: [e.BE],
            v: [{
                b: '"',
                e: '"'
            }, {
                b: "'",
                e: "'"
            }]
        }]
    }
}),
hljs.registerLanguage("coffeescript", function(e) {
    var t = {
        keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
        literal: "true false null undefined yes no on off",
        built_in: "npm require console print module global window document"
    }
      , n = "[A-Za-z$_][0-9A-Za-z$_]*"
      , i = {
        cN: "subst",
        b: /#\{/,
        e: /}/,
        k: t
    }
      , r = [e.BNM, e.inherit(e.CNM, {
        starts: {
            e: "(\\s*/)?",
            r: 0
        }
    }), {
        cN: "string",
        v: [{
            b: /'''/,
            e: /'''/,
            c: [e.BE]
        }, {
            b: /'/,
            e: /'/,
            c: [e.BE]
        }, {
            b: /"""/,
            e: /"""/,
            c: [e.BE, i]
        }, {
            b: /"/,
            e: /"/,
            c: [e.BE, i]
        }]
    }, {
        cN: "regexp",
        v: [{
            b: "///",
            e: "///",
            c: [i, e.HCM]
        }, {
            b: "//[gim]*",
            r: 0
        }, {
            b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
        }]
    }, {
        b: "@" + n
    }, {
        b: "`",
        e: "`",
        eB: !0,
        eE: !0,
        sL: "javascript"
    }];
    i.c = r;
    var a = e.inherit(e.TM, {
        b: n
    })
      , o = "(\\(.*\\))?\\s*\\B[-=]>"
      , s = {
        cN: "params",
        b: "\\([^\\(]",
        rB: !0,
        c: [{
            b: /\(/,
            e: /\)/,
            k: t,
            c: ["self"].concat(r)
        }]
    };
    return {
        aliases: ["coffee", "cson", "iced"],
        k: t,
        i: /\/\*/,
        c: r.concat([e.C("###", "###"), e.HCM, {
            cN: "function",
            b: "^\\s*" + n + "\\s*=\\s*" + o,
            e: "[-=]>",
            rB: !0,
            c: [a, s]
        }, {
            b: /[:\(,=]\s*/,
            r: 0,
            c: [{
                cN: "function",
                b: o,
                e: "[-=]>",
                rB: !0,
                c: [s]
            }]
        }, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [{
                bK: "extends",
                eW: !0,
                i: /[:="\[\]]/,
                c: [a]
            }, a]
        }, {
            b: n + ":",
            e: ":",
            rB: !0,
            rE: !0,
            r: 0
        }])
    }
}),
hljs.registerLanguage("less", function(e) {
    var t = "[\\w-]+"
      , n = "(" + t + "|@{" + t + "})"
      , i = []
      , r = []
      , a = function(e) {
        return {
            cN: "string",
            b: "~?" + e + ".*?" + e
        }
    }
      , o = function(e, t, n) {
        return {
            cN: e,
            b: t,
            r: n
        }
    }
      , s = {
        b: "\\(",
        e: "\\)",
        c: r,
        r: 0
    };
    r.push(e.CLCM, e.CBCM, a("'"), a('"'), e.CSSNM, {
        b: "(url|data-uri)\\(",
        starts: {
            cN: "string",
            e: "[\\)\\n]",
            eE: !0
        }
    }, o("number", "#[0-9A-Fa-f]+\\b"), s, o("variable", "@@?" + t, 10), o("variable", "@{" + t + "}"), o("built_in", "~?`[^`]*?`"), {
        cN: "attribute",
        b: t + "\\s*:",
        e: ":",
        rB: !0,
        eE: !0
    }, {
        cN: "meta",
        b: "!important"
    });
    var l = r.concat({
        b: "{",
        e: "}",
        c: i
    })
      , c = {
        bK: "when",
        eW: !0,
        c: [{
            bK: "and not"
        }].concat(r)
    }
      , u = {
        cN: "attribute",
        b: n,
        e: ":",
        eE: !0,
        c: [e.CLCM, e.CBCM],
        i: /\S/,
        starts: {
            e: "[;}]",
            rE: !0,
            c: r,
            i: "[<=$]"
        }
    }
      , d = {
        cN: "keyword",
        b: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
        starts: {
            e: "[;{}]",
            rE: !0,
            c: r,
            r: 0
        }
    }
      , p = {
        cN: "variable",
        v: [{
            b: "@" + t + "\\s*:",
            r: 15
        }, {
            b: "@" + t
        }],
        starts: {
            e: "[;}]",
            rE: !0,
            c: l
        }
    }
      , h = {
        v: [{
            b: "[\\.#:&\\[]",
            e: "[;{}]"
        }, {
            b: n + "[^;]*{",
            e: "{"
        }],
        rB: !0,
        rE: !0,
        i: "[<='$\"]",
        c: [e.CLCM, e.CBCM, c, o("keyword", "all\\b"), o("variable", "@{" + t + "}"), o("selector-tag", n + "%?", 0), o("selector-id", "#" + n), o("selector-class", "\\." + n, 0), o("selector-tag", "&", 0), {
            cN: "selector-attr",
            b: "\\[",
            e: "\\]"
        }, {
            b: "\\(",
            e: "\\)",
            c: l
        }, {
            b: "!important"
        }]
    };
    return i.push(e.CLCM, e.CBCM, d, p, h, u),
    {
        cI: !0,
        i: "[=>'/<($\"]",
        c: i
    }
}),
hljs.registerLanguage("json", function(e) {
    var t = {
        literal: "true false null"
    }
      , n = [e.QSM, e.CNM]
      , i = {
        e: ",",
        eW: !0,
        eE: !0,
        c: n,
        k: t
    }
      , r = {
        b: "{",
        e: "}",
        c: [{
            cN: "attr",
            b: '\\s*"',
            e: '"\\s*:\\s*',
            eB: !0,
            eE: !0,
            c: [e.BE],
            i: "\\n",
            starts: i
        }],
        i: "\\S"
    }
      , a = {
        b: "\\[",
        e: "\\]",
        c: [e.inherit(i)],
        i: "\\S"
    };
    return n.splice(n.length, 0, r, a),
    {
        c: n,
        k: t,
        i: "\\S"
    }
}),
hljs.registerLanguage("go", function(e) {
    var t = {
        keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
        literal: "true false iota nil",
        built_in: "append cap close complex copy imag len make new panic print println real recover delete"
    };
    return {
        aliases: ["golang"],
        k: t,
        i: "</",
        c: [e.CLCM, e.CBCM, e.QSM, {
            cN: "string",
            b: "'",
            e: "[^\\\\]'"
        }, {
            cN: "string",
            b: "`",
            e: "`"
        }, {
            cN: "number",
            b: e.CNR + "[dflsi]?",
            r: 0
        }, e.CNM]
    }
}),
hljs.registerLanguage("groovy", function(e) {
    return {
        k: {
            literal: "true false null",
            keyword: "byte short char int long boolean float double void def as in assert trait super this abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"
        },
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                b: /\w+@/,
                r: 0
            }, {
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, {
            cN: "string",
            b: '"""',
            e: '"""'
        }, {
            cN: "string",
            b: "'''",
            e: "'''"
        }, {
            cN: "string",
            b: "\\$/",
            e: "/\\$",
            r: 10
        }, e.ASM, {
            cN: "regexp",
            b: /~?\/[^\/\n]+\//,
            c: [e.BE]
        }, e.QSM, {
            cN: "meta",
            b: "^#!/usr/bin/env",
            e: "$",
            i: "\n"
        }, e.BNM, {
            cN: "class",
            bK: "class interface trait enum",
            e: "{",
            i: ":",
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, e.CNM, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }, {
            cN: "string",
            b: /[^\?]{0}[A-Za-z0-9_$]+ *:/
        }, {
            b: /\?/,
            e: /\:/
        }, {
            cN: "symbol",
            b: "^\\s*[A-Za-z0-9_$]+:",
            r: 0
        }],
        i: /#|<\//
    }
}),
hljs.registerLanguage("swift", function(e) {
    var t = {
        keyword: "__COLUMN__ __FILE__ __FUNCTION__ __LINE__ as as! as? associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",
        literal: "true false nil",
        built_in: "abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"
    }
      , n = {
        cN: "type",
        b: "\\b[A-Z][\\w']*",
        r: 0
    }
      , i = e.C("/\\*", "\\*/", {
        c: ["self"]
    })
      , r = {
        cN: "subst",
        b: /\\\(/,
        e: "\\)",
        k: t,
        c: []
    }
      , a = {
        cN: "number",
        b: "\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",
        r: 0
    }
      , o = e.inherit(e.QSM, {
        c: [r, e.BE]
    });
    return r.c = [a],
    {
        k: t,
        c: [o, e.CLCM, i, n, a, {
            cN: "function",
            bK: "func",
            e: "{",
            eE: !0,
            c: [e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/,
                i: /\(/
            }), {
                b: /</,
                e: />/,
                i: />/
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                endsParent: !0,
                k: t,
                c: ["self", a, o, e.CBCM, {
                    b: ":"
                }],
                i: /["']/
            }],
            i: /\[|%/
        }, {
            cN: "class",
            bK: "struct protocol class extension enum",
            k: t,
            e: "\\{",
            eE: !0,
            c: [e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            })]
        }, {
            cN: "meta",
            b: "(@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain)"
        }, {
            bK: "import",
            e: /$/,
            c: [e.CLCM, i]
        }]
    }
}),
hljs.registerLanguage("haskell", function(e) {
    var t = {
        v: [e.C("--", "$"), e.C("{-", "-}", {
            c: ["self"]
        })]
    }
      , n = {
        cN: "meta",
        b: "{-#",
        e: "#-}"
    }
      , i = {
        cN: "meta",
        b: "^#",
        e: "$"
    }
      , r = {
        cN: "type",
        b: "\\b[A-Z][\\w']*",
        r: 0
    }
      , a = {
        b: "\\(",
        e: "\\)",
        i: '"',
        c: [n, i, {
            cN: "type",
            b: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
        }, e.inherit(e.TM, {
            b: "[_a-z][\\w']*"
        }), t]
    }
      , o = {
        b: "{",
        e: "}",
        c: a.c
    };
    return {
        aliases: ["hs"],
        k: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
        c: [{
            bK: "module",
            e: "where",
            k: "module where",
            c: [a, t],
            i: "\\W\\.|;"
        }, {
            b: "\\bimport\\b",
            e: "$",
            k: "import qualified as hiding",
            c: [a, t],
            i: "\\W\\.|;"
        }, {
            cN: "class",
            b: "^(\\s*)?(class|instance)\\b",
            e: "where",
            k: "class family instance where",
            c: [r, a, t]
        }, {
            cN: "class",
            b: "\\b(data|(new)?type)\\b",
            e: "$",
            k: "data family type newtype deriving",
            c: [n, r, a, o, t]
        }, {
            bK: "default",
            e: "$",
            c: [r, a, t]
        }, {
            bK: "infix infixl infixr",
            e: "$",
            c: [e.CNM, t]
        }, {
            b: "\\bforeign\\b",
            e: "$",
            k: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
            c: [r, e.QSM, t]
        }, {
            cN: "meta",
            b: "#!\\/usr\\/bin\\/env runhaskell",
            e: "$"
        }, n, i, e.QSM, e.CNM, r, e.inherit(e.TM, {
            b: "^[_a-z][\\w']*"
        }), t, {
            b: "->|<-"
        }]
    }
}),
hljs.registerLanguage("markdown", function() {
    return {
        aliases: ["md", "mkdown", "mkd"],
        c: [{
            cN: "section",
            v: [{
                b: "^#{1,6}",
                e: "$"
            }, {
                b: "^.+?\\n[=-]{2,}$"
            }]
        }, {
            b: "<",
            e: ">",
            sL: "xml",
            r: 0
        }, {
            cN: "bullet",
            b: "^([*+-]|(\\d+\\.))\\s+"
        }, {
            cN: "strong",
            b: "[*_]{2}.+?[*_]{2}"
        }, {
            cN: "emphasis",
            v: [{
                b: "\\*.+?\\*"
            }, {
                b: "_.+?_",
                r: 0
            }]
        }, {
            cN: "quote",
            b: "^>\\s+",
            e: "$"
        }, {
            cN: "code",
            v: [{
                b: "`.+?`"
            }, {
                b: "^( {4}|	)",
                e: "$",
                r: 0
            }]
        }, {
            b: "^[-\\*]{3,}",
            e: "$"
        }, {
            b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
            rB: !0,
            c: [{
                cN: "string",
                b: "\\[",
                e: "\\]",
                eB: !0,
                rE: !0,
                r: 0
            }, {
                cN: "link",
                b: "\\]\\(",
                e: "\\)",
                eB: !0,
                eE: !0
            }, {
                cN: "symbol",
                b: "\\]\\[",
                e: "\\]",
                eB: !0,
                eE: !0
            }],
            r: 10
        }, {
            b: "^\\[.+\\]:",
            rB: !0,
            c: [{
                cN: "symbol",
                b: "\\[",
                e: "\\]:",
                eB: !0,
                eE: !0,
                starts: {
                    cN: "link",
                    e: "$"
                }
            }]
        }]
    }
}),
hljs.registerLanguage("javascript", function(e) {
    return {
        aliases: ["js"],
        k: {
            keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await import from as",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
        },
        c: [{
            cN: "meta",
            r: 10,
            b: /^\s*['"]use (strict|asm)['"]/
        }, e.ASM, e.QSM, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE, {
                cN: "subst",
                b: "\\$\\{",
                e: "\\}"
            }]
        }, e.CLCM, e.CBCM, {
            cN: "number",
            v: [{
                b: "\\b(0[bB][01]+)"
            }, {
                b: "\\b(0[oO][0-7]+)"
            }, {
                b: e.CNR
            }],
            r: 0
        }, {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBCM, e.RM, {
                b: /</,
                e: />\s*[);\]]/,
                r: 0,
                sL: "xml"
            }],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            eE: !0,
            c: [e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                c: [e.CLCM, e.CBCM]
            }],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, {
            b: "\\." + e.IR,
            r: 0
        }, {
            cN: "class",
            bK: "class",
            e: /[{;=]/,
            eE: !0,
            i: /[:"\[\]]/,
            c: [{
                bK: "extends"
            }, e.UTM]
        }, {
            bK: "constructor",
            e: /\{/,
            eE: !0
        }],
        i: /#/
    }
}),
hljs.registerLanguage("diff", function() {
    return {
        aliases: ["patch"],
        c: [{
            cN: "meta",
            r: 10,
            v: [{
                b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
            }, {
                b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
            }, {
                b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
            }]
        }, {
            cN: "comment",
            v: [{
                b: /Index: /,
                e: /$/
            }, {
                b: /=====/,
                e: /=====$/
            }, {
                b: /^\-\-\-/,
                e: /$/
            }, {
                b: /^\*{3} /,
                e: /$/
            }, {
                b: /^\+\+\+/,
                e: /$/
            }, {
                b: /\*{5}/,
                e: /\*{5}$/
            }]
        }, {
            cN: "addition",
            b: "^\\+",
            e: "$"
        }, {
            cN: "deletion",
            b: "^\\-",
            e: "$"
        }, {
            cN: "addition",
            b: "^\\!",
            e: "$"
        }]
    }
}),
hljs.registerLanguage("dockerfile", function(e) {
    return {
        aliases: ["docker"],
        cI: !0,
        k: "from maintainer cmd expose add copy entrypoint volume user workdir onbuild run env label",
        c: [e.HCM, {
            k: "run cmd entrypoint volume add copy workdir onbuild label",
            b: /^ *(onbuild +)?(run|cmd|entrypoint|volume|add|copy|workdir|label) +/,
            starts: {
                e: /[^\\]\n/,
                sL: "bash"
            }
        }, {
            k: "from maintainer expose env user onbuild",
            b: /^ *(onbuild +)?(from|maintainer|expose|env|user|onbuild) +/,
            e: /[^\\]\n/,
            c: [e.ASM, e.QSM, e.NM, e.HCM]
        }]
    }
}),
hljs.registerLanguage("elixir", function(e) {
    var t = "[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?"
      , n = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"
      , i = "and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote"
      , r = {
        cN: "subst",
        b: "#\\{",
        e: "}",
        l: t,
        k: i
    }
      , a = {
        cN: "string",
        c: [e.BE, r],
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }]
    }
      , o = {
        cN: "function",
        bK: "def defp defmacro",
        e: /\B\b/,
        c: [e.inherit(e.TM, {
            b: t,
            endsParent: !0
        })]
    }
      , s = e.inherit(o, {
        cN: "class",
        bK: "defmodule defrecord",
        e: /\bdo\b|$|;/
    })
      , l = [a, e.HCM, s, o, {
        cN: "symbol",
        b: ":",
        c: [a, {
            b: n
        }],
        r: 0
    }, {
        cN: "symbol",
        b: t + ":",
        r: 0
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        cN: "variable",
        b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, {
        b: "->"
    }, {
        b: "(" + e.RSR + ")\\s*",
        c: [e.HCM, {
            cN: "regexp",
            i: "\\n",
            c: [e.BE, r],
            v: [{
                b: "/",
                e: "/[a-z]*"
            }, {
                b: "%r\\[",
                e: "\\][a-z]*"
            }]
        }],
        r: 0
    }];
    return r.c = l,
    {
        l: t,
        k: i,
        c: l
    }
}),
hljs.registerLanguage("kotlin", function(e) {
    var t = "val var get set class trait object open private protected public final enum if else do while for when break continue throw try catch finally import package is as in return fun override default companion reified inline volatile transient native Byte Short Char Int Long Boolean Float Double Void Unit Nothing";
    return {
        k: {
            keyword: t,
            literal: "true false null"
        },
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, {
            cN: "type",
            b: /</,
            e: />/,
            rB: !0,
            eE: !1,
            r: 0
        }, {
            cN: "function",
            bK: "fun",
            e: "[(]|$",
            rB: !0,
            eE: !0,
            k: t,
            i: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
            r: 5,
            c: [{
                b: e.UIR + "\\s*\\(",
                rB: !0,
                r: 0,
                c: [e.UTM]
            }, {
                cN: "type",
                b: /</,
                e: />/,
                k: "reified",
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: t,
                r: 0,
                i: /\([^\(,\s:]+,/,
                c: [{
                    cN: "type",
                    b: /:\s*/,
                    e: /\s*[=\)]/,
                    eB: !0,
                    rE: !0,
                    r: 0
                }]
            }, e.CLCM, e.CBCM]
        }, {
            cN: "class",
            bK: "class trait",
            e: /[:\{(]|$/,
            eE: !0,
            i: "extends implements",
            c: [e.UTM, {
                cN: "type",
                b: /</,
                e: />/,
                eB: !0,
                eE: !0,
                r: 0
            }, {
                cN: "type",
                b: /[,:]\s*/,
                e: /[<\(,]|$/,
                eB: !0,
                rE: !0
            }]
        }, {
            cN: "variable",
            bK: "var val",
            e: /\s*[=:$]/,
            eE: !0
        }, e.QSM, {
            cN: "meta",
            b: "^#!/usr/bin/env",
            e: "$",
            i: "\n"
        }, e.CNM]
    }
}),
hljs.registerLanguage("gradle", function(e) {
    return {
        cI: !0,
        k: {
            keyword: "task project allprojects subprojects artifacts buildscript configurations dependencies repositories sourceSets description delete from into include exclude source classpath destinationDir includes options sourceCompatibility targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant def abstract break case catch continue default do else extends final finally for if implements instanceof native new private protected public return static switch synchronized throw throws transient try volatile while strictfp package import false null super this true antlrtask checkstyle codenarc copy boolean byte char class double float int interface long short void compile runTime file fileTree abs any append asList asWritable call collect compareTo count div dump each eachByte eachFile eachLine every find findAll flatten getAt getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter newReader newWriter next plus pop power previous print println push putAt read readBytes readLines reverse reverseEach round size sort splitEachLine step subMap times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader withStream withWriter withWriterAppend write writeLine"
        },
        c: [e.CLCM, e.CBCM, e.ASM, e.QSM, e.NM, e.RM]
    }
}),
hljs.registerLanguage("vim", function(e) {
    return {
        l: /[!#@\w]+/,
        k: {
            keyword: "N|0 P|0 X|0 a|0 ab abc abo al am an|0 ar arga argd arge argdo argg argl argu as au aug aun b|0 bN ba bad bd be bel bf bl bm bn bo bp br brea breaka breakd breakl bro bufdo buffers bun bw c|0 cN cNf ca cabc caddb cad caddf cal cat cb cc ccl cd ce cex cf cfir cgetb cgete cg changes chd che checkt cl cla clo cm cmapc cme cn cnew cnf cno cnorea cnoreme co col colo com comc comp con conf cope cp cpf cq cr cs cst cu cuna cunme cw d|0 delm deb debugg delc delf dif diffg diffo diffp diffpu diffs diffthis dig di dl dell dj dli do doautoa dp dr ds dsp e|0 ea ec echoe echoh echom echon el elsei em en endfo endf endt endw ene ex exe exi exu f|0 files filet fin fina fini fir fix fo foldc foldd folddoc foldo for fu g|0 go gr grepa gu gv ha h|0 helpf helpg helpt hi hid his i|0 ia iabc if ij il im imapc ime ino inorea inoreme int is isp iu iuna iunme j|0 ju k|0 keepa kee keepj lN lNf l|0 lad laddb laddf la lan lat lb lc lch lcl lcs le lefta let lex lf lfir lgetb lgete lg lgr lgrepa lh ll lla lli lmak lm lmapc lne lnew lnf ln loadk lo loc lockv lol lope lp lpf lr ls lt lu lua luad luaf lv lvimgrepa lw m|0 ma mak map mapc marks mat me menut mes mk mks mksp mkv mkvie mod mz mzf nbc nb nbs n|0 new nm nmapc nme nn nnoreme noa no noh norea noreme norm nu nun nunme ol o|0 om omapc ome on ono onoreme opt ou ounme ow p|0 profd prof pro promptr pc ped pe perld po popu pp pre prev ps pt ptN ptf ptj ptl ptn ptp ptr pts pu pw py3 python3 py3d py3f py pyd pyf q|0 quita qa r|0 rec red redi redr redraws reg res ret retu rew ri rightb rub rubyd rubyf rund ru rv s|0 sN san sa sal sav sb sbN sba sbf sbl sbm sbn sbp sbr scrip scripte scs se setf setg setl sf sfir sh sim sig sil sl sla sm smap smapc sme sn sni sno snor snoreme sor so spelld spe spelli spellr spellu spellw sp spr sre st sta startg startr star stopi stj sts sun sunm sunme sus sv sw sy synti sync t|0 tN tabN tabc tabdo tabe tabf tabfir tabl tabm tabnew tabn tabo tabp tabr tabs tab ta tags tc tcld tclf te tf th tj tl tm tn to tp tr try ts tu u|0 undoj undol una unh unl unlo unm unme uns up v|0 ve verb vert vim vimgrepa vi viu vie vm vmapc vme vne vn vnoreme vs vu vunme windo w|0 wN wa wh wi winc winp wn wp wq wqa ws wu wv x|0 xa xmapc xm xme xn xnoreme xu xunme y|0 z|0 ~ Next Print append abbreviate abclear aboveleft all amenu anoremenu args argadd argdelete argedit argglobal arglocal argument ascii autocmd augroup aunmenu buffer bNext ball badd bdelete behave belowright bfirst blast bmodified bnext botright bprevious brewind break breakadd breakdel breaklist browse bunload bwipeout change cNext cNfile cabbrev cabclear caddbuffer caddexpr caddfile call catch cbuffer cclose center cexpr cfile cfirst cgetbuffer cgetexpr cgetfile chdir checkpath checktime clist clast close cmap cmapclear cmenu cnext cnewer cnfile cnoremap cnoreabbrev cnoremenu copy colder colorscheme command comclear compiler continue confirm copen cprevious cpfile cquit crewind cscope cstag cunmap cunabbrev cunmenu cwindow delete delmarks debug debuggreedy delcommand delfunction diffupdate diffget diffoff diffpatch diffput diffsplit digraphs display deletel djump dlist doautocmd doautoall deletep drop dsearch dsplit edit earlier echo echoerr echohl echomsg else elseif emenu endif endfor endfunction endtry endwhile enew execute exit exusage file filetype find finally finish first fixdel fold foldclose folddoopen folddoclosed foldopen function global goto grep grepadd gui gvim hardcopy help helpfind helpgrep helptags highlight hide history insert iabbrev iabclear ijump ilist imap imapclear imenu inoremap inoreabbrev inoremenu intro isearch isplit iunmap iunabbrev iunmenu join jumps keepalt keepmarks keepjumps lNext lNfile list laddexpr laddbuffer laddfile last language later lbuffer lcd lchdir lclose lcscope left leftabove lexpr lfile lfirst lgetbuffer lgetexpr lgetfile lgrep lgrepadd lhelpgrep llast llist lmake lmap lmapclear lnext lnewer lnfile lnoremap loadkeymap loadview lockmarks lockvar lolder lopen lprevious lpfile lrewind ltag lunmap luado luafile lvimgrep lvimgrepadd lwindow move mark make mapclear match menu menutranslate messages mkexrc mksession mkspell mkvimrc mkview mode mzscheme mzfile nbclose nbkey nbsart next nmap nmapclear nmenu nnoremap nnoremenu noautocmd noremap nohlsearch noreabbrev noremenu normal number nunmap nunmenu oldfiles open omap omapclear omenu only onoremap onoremenu options ounmap ounmenu ownsyntax print profdel profile promptfind promptrepl pclose pedit perl perldo pop popup ppop preserve previous psearch ptag ptNext ptfirst ptjump ptlast ptnext ptprevious ptrewind ptselect put pwd py3do py3file python pydo pyfile quit quitall qall read recover redo redir redraw redrawstatus registers resize retab return rewind right rightbelow ruby rubydo rubyfile rundo runtime rviminfo substitute sNext sandbox sargument sall saveas sbuffer sbNext sball sbfirst sblast sbmodified sbnext sbprevious sbrewind scriptnames scriptencoding scscope set setfiletype setglobal setlocal sfind sfirst shell simalt sign silent sleep slast smagic smapclear smenu snext sniff snomagic snoremap snoremenu sort source spelldump spellgood spellinfo spellrepall spellundo spellwrong split sprevious srewind stop stag startgreplace startreplace startinsert stopinsert stjump stselect sunhide sunmap sunmenu suspend sview swapname syntax syntime syncbind tNext tabNext tabclose tabedit tabfind tabfirst tablast tabmove tabnext tabonly tabprevious tabrewind tag tcl tcldo tclfile tearoff tfirst throw tjump tlast tmenu tnext topleft tprevious trewind tselect tunmenu undo undojoin undolist unabbreviate unhide unlet unlockvar unmap unmenu unsilent update vglobal version verbose vertical vimgrep vimgrepadd visual viusage view vmap vmapclear vmenu vnew vnoremap vnoremenu vsplit vunmap vunmenu write wNext wall while winsize wincmd winpos wnext wprevious wqall wsverb wundo wviminfo xit xall xmapclear xmap xmenu xnoremap xnoremenu xunmap xunmenu yank",
            built_in: "abs acos add and append argc argidx argv asin atan atan2 browse browsedir bufexists buflisted bufloaded bufname bufnr bufwinnr byte2line byteidx call ceil changenr char2nr cindent clearmatches col complete complete_add complete_check confirm copy cos cosh count cscope_connection cursor deepcopy delete did_filetype diff_filler diff_hlID empty escape eval eventhandler executable exists exp expand extend feedkeys filereadable filewritable filter finddir findfile float2nr floor fmod fnameescape fnamemodify foldclosed foldclosedend foldlevel foldtext foldtextresult foreground function garbagecollect get getbufline getbufvar getchar getcharmod getcmdline getcmdpos getcmdtype getcwd getfontname getfperm getfsize getftime getftype getline getloclist getmatches getpid getpos getqflist getreg getregtype gettabvar gettabwinvar getwinposx getwinposy getwinvar glob globpath has has_key haslocaldir hasmapto histadd histdel histget histnr hlexists hlID hostname iconv indent index input inputdialog inputlist inputrestore inputsave inputsecret insert invert isdirectory islocked items join keys len libcall libcallnr line line2byte lispindent localtime log log10 luaeval map maparg mapcheck match matchadd matcharg matchdelete matchend matchlist matchstr max min mkdir mode mzeval nextnonblank nr2char or pathshorten pow prevnonblank printf pumvisible py3eval pyeval range readfile reltime reltimestr remote_expr remote_foreground remote_peek remote_read remote_send remove rename repeat resolve reverse round screenattr screenchar screencol screenrow search searchdecl searchpair searchpairpos searchpos server2client serverlist setbufvar setcmdpos setline setloclist setmatches setpos setqflist setreg settabvar settabwinvar setwinvar sha256 shellescape shiftwidth simplify sin sinh sort soundfold spellbadword spellsuggest split sqrt str2float str2nr strchars strdisplaywidth strftime stridx string strlen strpart strridx strtrans strwidth submatch substitute synconcealed synID synIDattr synIDtrans synstack system tabpagebuflist tabpagenr tabpagewinnr tagfiles taglist tan tanh tempname tolower toupper tr trunc type undofile undotree values virtcol visualmode wildmenumode winbufnr wincol winheight winline winnr winrestcmd winrestview winsaveview winwidth writefile xor"
        },
        i: /[{:]/,
        c: [e.NM, e.ASM, {
            cN: "string",
            b: /"((\\")|[^"\n])*("|\n)/
        }, {
            cN: "variable",
            b: /[bwtglsav]:[\w\d_]*/
        }, {
            cN: "function",
            bK: "function function!",
            e: "$",
            r: 0,
            c: [e.TM, {
                cN: "params",
                b: "\\(",
                e: "\\)"
            }]
        }]
    }
}),
hljs.registerLanguage("objectivec", function(e) {
    var t = {
        cN: "built_in",
        b: "(AV|CA|CF|CG|CI|MK|MP|NS|UI|XC)\\w+"
    }
      , n = {
        keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
        literal: "false true FALSE TRUE nil YES NO NULL",
        built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
    }
      , i = /[a-zA-Z@][a-zA-Z0-9_]*/
      , r = "@interface @class @protocol @implementation";
    return {
        aliases: ["mm", "objc", "obj-c"],
        k: n,
        l: i,
        i: "</",
        c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
            cN: "string",
            v: [{
                b: '@"',
                e: '"',
                i: "\\n",
                c: [e.BE]
            }, {
                b: "'",
                e: "[^\\\\]'",
                i: "[^\\\\][^']"
            }]
        }, {
            cN: "meta",
            b: "#",
            e: "$",
            c: [{
                cN: "meta-string",
                v: [{
                    b: '"',
                    e: '"'
                }, {
                    b: "<",
                    e: ">"
                }]
            }]
        }, {
            cN: "class",
            b: "(" + r.split(" ").join("|") + ")\\b",
            e: "({|$)",
            eE: !0,
            k: r,
            l: i,
            c: [e.UTM]
        }, {
            b: "\\." + e.UIR,
            r: 0
        }]
    }
}),
hljs.registerLanguage("lisp", function(e) {
    var t = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*"
      , n = "\\|[^]*?\\|"
      , i = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?"
      , r = {
        cN: "meta",
        b: "^#!",
        e: "$"
    }
      , a = {
        cN: "literal",
        b: "\\b(t{1}|nil)\\b"
    }
      , o = {
        cN: "number",
        v: [{
            b: i,
            r: 0
        }, {
            b: "#(b|B)[0-1]+(/[0-1]+)?"
        }, {
            b: "#(o|O)[0-7]+(/[0-7]+)?"
        }, {
            b: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"
        }, {
            b: "#(c|C)\\(" + i + " +" + i,
            e: "\\)"
        }]
    }
      , s = e.inherit(e.QSM, {
        i: null
    })
      , l = e.C(";", "$", {
        r: 0
    })
      , c = {
        b: "\\*",
        e: "\\*"
    }
      , u = {
        cN: "symbol",
        b: "[:&]" + t
    }
      , d = {
        b: t,
        r: 0
    }
      , p = {
        b: n
    }
      , h = {
        b: "\\(",
        e: "\\)",
        c: ["self", a, s, o, d]
    }
      , f = {
        c: [o, s, c, u, h, d],
        v: [{
            b: "['`]\\(",
            e: "\\)"
        }, {
            b: "\\(quote ",
            e: "\\)",
            k: {
                name: "quote"
            }
        }, {
            b: "'" + n
        }]
    }
      , g = {
        v: [{
            b: "'" + t
        }, {
            b: "#'" + t + "(::" + t + ")*"
        }]
    }
      , m = {
        b: "\\(\\s*",
        e: "\\)"
    }
      , b = {
        eW: !0,
        r: 0
    };
    return m.c = [{
        cN: "name",
        v: [{
            b: t
        }, {
            b: n
        }]
    }, b],
    b.c = [f, g, m, a, o, s, l, c, u, p, d],
    {
        i: /\S/,
        c: [o, r, a, s, l, f, g, m, d]
    }
}),
hljs.registerLanguage("ini", function(e) {
    var t = {
        cN: "string",
        c: [e.BE],
        v: [{
            b: "'''",
            e: "'''",
            r: 10
        }, {
            b: '"""',
            e: '"""',
            r: 10
        }, {
            b: '"',
            e: '"'
        }, {
            b: "'",
            e: "'"
        }]
    };
    return {
        aliases: ["toml"],
        cI: !0,
        i: /\S/,
        c: [e.C(";", "$"), e.HCM, {
            cN: "section",
            b: /^\s*\[+/,
            e: /\]+/
        }, {
            b: /^[a-z0-9\[\]_-]+\s*=\s*/,
            e: "$",
            rB: !0,
            c: [{
                cN: "attr",
                b: /[a-z0-9\[\]_-]+/
            }, {
                b: /=/,
                eW: !0,
                r: 0,
                c: [{
                    cN: "literal",
                    b: /\bon|off|true|false|yes|no\b/
                }, {
                    cN: "variable",
                    v: [{
                        b: /\$[\w\d"][\w\d_]*/
                    }, {
                        b: /\$\{(.*?)}/
                    }]
                }, t, {
                    cN: "number",
                    b: /([\+\-]+)?[\d]+_[\d_]+/
                }, e.NM]
            }]
        }]
    }
}),
hljs.registerLanguage("scala", function(e) {
    var t = {
        cN: "meta",
        b: "@[A-Za-z]+"
    }
      , n = {
        cN: "subst",
        v: [{
            b: "\\$[A-Za-z0-9_]+"
        }, {
            b: "\\${",
            e: "}"
        }]
    }
      , i = {
        cN: "string",
        v: [{
            b: '"',
            e: '"',
            i: "\\n",
            c: [e.BE]
        }, {
            b: '"""',
            e: '"""',
            r: 10
        }, {
            b: '[a-z]+"',
            e: '"',
            i: "\\n",
            c: [e.BE, n]
        }, {
            cN: "string",
            b: '[a-z]+"""',
            e: '"""',
            c: [n],
            r: 10
        }]
    }
      , r = {
        cN: "symbol",
        b: "'\\w[\\w\\d_]*(?!')"
    }
      , a = {
        cN: "type",
        b: "\\b[A-Z][A-Za-z0-9_]*",
        r: 0
    }
      , o = {
        cN: "title",
        b: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
        r: 0
    }
      , s = {
        cN: "class",
        bK: "class object trait type",
        e: /[:={\[\n;]/,
        eE: !0,
        c: [{
            bK: "extends with",
            r: 10
        }, {
            b: /\[/,
            e: /\]/,
            eB: !0,
            eE: !0,
            r: 0,
            c: [a]
        }, {
            cN: "params",
            b: /\(/,
            e: /\)/,
            eB: !0,
            eE: !0,
            r: 0,
            c: [a]
        }, o]
    }
      , l = {
        cN: "function",
        bK: "def",
        e: /[:={\[(\n;]/,
        eE: !0,
        c: [o]
    };
    return {
        k: {
            literal: "true false null",
            keyword: "type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"
        },
        c: [e.CLCM, e.CBCM, i, r, a, l, s, e.CNM, t]
    }
}),
hljs.registerLanguage("scss", function(e) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*"
      , n = {
        cN: "variable",
        b: "(\\$" + t + ")\\b"
    }
      , i = {
        cN: "number",
        b: "#[0-9A-Fa-f]+"
    };
    return {
        cN: "attribute",
        b: "[A-Z\\_\\.\\-]+",
        e: ":",
        eE: !0,
        i: "[^\\s]",
        starts: {
            eW: !0,
            eE: !0,
            c: [i, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                cN: "meta",
                b: "!important"
            }]
        }
    },
    {
        cI: !0,
        i: "[=/|']",
        c: [e.CLCM, e.CBCM, {
            cN: "selector-id",
            b: "\\#[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "selector-class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "selector-attr",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "selector-tag",
            b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
            r: 0
        }, {
            b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
        }, {
            b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
        }, n, {
            cN: "attribute",
            b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
            i: "[^\\s]"
        }, {
            b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
        }, {
            b: ":",
            e: ";",
            c: [n, i, e.CSSNM, e.QSM, e.ASM, {
                cN: "meta",
                b: "!important"
            }]
        }, {
            b: "@",
            e: "[{;]",
            k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
            c: [n, e.QSM, e.ASM, i, e.CSSNM, {
                b: "\\s[A-Za-z0-9_.-]+",
                r: 0
            }]
        }]
    }
}),
hljs.registerLanguage("css", function(e) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*"
      , n = {
        b: /[A-Z\_\.\-]+\s*:/,
        rB: !0,
        e: ";",
        eW: !0,
        c: [{
            cN: "attribute",
            b: /\S/,
            e: ":",
            eE: !0,
            starts: {
                eW: !0,
                eE: !0,
                c: [{
                    b: /[\w-]+\s*\(/,
                    rB: !0,
                    c: [{
                        cN: "built_in",
                        b: /[\w-]+/
                    }]
                }, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                    cN: "number",
                    b: "#[0-9A-Fa-f]+"
                }, {
                    cN: "meta",
                    b: "!important"
                }]
            }
        }]
    };
    return {
        cI: !0,
        i: /[=\/|'\$]/,
        c: [e.CBCM, {
            cN: "selector-id",
            b: /#[A-Za-z0-9_-]+/
        }, {
            cN: "selector-class",
            b: /\.[A-Za-z0-9_-]+/
        }, {
            cN: "selector-attr",
            b: /\[/,
            e: /\]/,
            i: "$"
        }, {
            cN: "selector-pseudo",
            b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/
        }, {
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            b: "@",
            e: "[{;]",
            c: [{
                cN: "keyword",
                b: /\S+/
            }, {
                b: /\s/,
                eW: !0,
                eE: !0,
                r: 0,
                c: [e.ASM, e.QSM, e.CSSNM]
            }]
        }, {
            cN: "selector-tag",
            b: t,
            r: 0
        }, {
            b: "{",
            e: "}",
            i: /\S/,
            c: [e.CBCM, n]
        }]
    }
}),
hljs.registerLanguage("yaml", function(e) {
    var t = {
        literal: "{ } true false yes no Yes No True False null"
    }
      , n = "^[ \\-]*"
      , i = "[a-zA-Z_][\\w\\-]*"
      , r = {
        cN: "attr",
        v: [{
            b: n + i + ":"
        }, {
            b: n + '"' + i + '":'
        }, {
            b: n + "'" + i + "':"
        }]
    }
      , a = {
        cN: "template-variable",
        v: [{
            b: "{{",
            e: "}}"
        }, {
            b: "%{",
            e: "}"
        }]
    }
      , o = {
        cN: "string",
        r: 0,
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }],
        c: [e.BE, a]
    };
    return {
        cI: !0,
        aliases: ["yml", "YAML", "yaml"],
        c: [r, {
            cN: "meta",
            b: "^---s*$",
            r: 10
        }, {
            cN: "string",
            b: "[\\|>] *$",
            rE: !0,
            c: o.c,
            e: r.v[0].b
        }, {
            b: "<%[%=-]?",
            e: "[%-]?%>",
            sL: "ruby",
            eB: !0,
            eE: !0,
            r: 0
        }, {
            cN: "type",
            b: "!!" + e.UIR
        }, {
            cN: "meta",
            b: "&" + e.UIR + "$"
        }, {
            cN: "meta",
            b: "\\*" + e.UIR + "$"
        }, {
            cN: "bullet",
            b: "^ *-",
            r: 0
        }, o, e.HCM, e.CNM],
        k: t
    }
}),
hljs.registerLanguage("cos", function(e) {
    var t = {
        cN: "string",
        v: [{
            b: '"',
            e: '"',
            c: [{
                b: '""',
                r: 0
            }]
        }]
    }
      , n = {
        cN: "number",
        b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
        r: 0
    }
      , i = (e.IR + "\\s*\\(",
    {
        keyword: ["break", "catch", "close", "continue", "do", "d", "else", "elseif", "for", "goto", "halt", "hang", "h", "if", "job", "j", "kill", "k", "lock", "l", "merge", "new", "open", "quit", "q", "read", "r", "return", "set", "s", "tcommit", "throw", "trollback", "try", "tstart", "use", "view", "while", "write", "w", "xecute", "x", "zkill", "znspace", "zn", "ztrap", "zwrite", "zw", "zzdump", "zzwrite", "print", "zbreak", "zinsert", "zload", "zprint", "zremove", "zsave", "zzprint", "mv", "mvcall", "mvcrt", "mvdim", "mvprint", "zquit", "zsync", "ascii"].join(" ")
    });
    return {
        cI: !0,
        aliases: ["cos", "cls"],
        k: i,
        c: [n, t, e.CLCM, e.CBCM, {
            cN: "built_in",
            b: /\$\$?[a-zA-Z]+/
        }, {
            cN: "keyword",
            b: /\$\$\$[a-zA-Z]+/
        }, {
            cN: "symbol",
            b: /\^%?[a-zA-Z][\w]*/
        }, {
            cN: "keyword",
            b: /##class/
        }, {
            b: /&sql\(/,
            e: /\)/,
            eB: !0,
            eE: !0,
            sL: "sql"
        }, {
            b: /&(js|jscript|javascript)</,
            e: />/,
            eB: !0,
            eE: !0,
            sL: "javascript"
        }, {
            b: /&html<\s*</,
            e: />\s*>/,
            sL: "xml"
        }]
    }
}),
hljs.registerLanguage("rust", function(e) {
    var t = "([uif](8|16|32|64|size))?"
      , n = e.inherit(e.CBCM);
    n.c.push("self");
    var i = "Copy Send Sized Sync Drop Fn FnMut FnOnce drop Box ToOwned Clone PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator Option Some None Result Ok Err SliceConcatExt String ToString Vec assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln!";
    return {
        aliases: ["rs"],
        k: {
            keyword: "alignof as be box break const continue crate do else enum extern false fn for if impl in let loop match mod mut offsetof once priv proc pub pure ref return self Self sizeof static struct super trait true type typeof unsafe unsized use virtual while where yield int i8 i16 i32 i64 uint u8 u32 u64 float f32 f64 str char bool",
            literal: "true false",
            built_in: i
        },
        l: e.IR + "!?",
        i: "</",
        c: [e.CLCM, n, e.inherit(e.QSM, {
            i: null
        }), {
            cN: "string",
            v: [{
                b: /r(#*)".*?"\1(?!#)/
            }, {
                b: /'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
            }]
        }, {
            cN: "symbol",
            b: /'[a-zA-Z_][a-zA-Z0-9_]*/
        }, {
            cN: "number",
            v: [{
                b: "\\b0b([01_]+)" + t
            }, {
                b: "\\b0o([0-7_]+)" + t
            }, {
                b: "\\b0x([A-Fa-f0-9_]+)" + t
            }, {
                b: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + t
            }],
            r: 0
        }, {
            cN: "function",
            bK: "fn",
            e: "(\\(|<)",
            eE: !0,
            c: [e.UTM]
        }, {
            cN: "meta",
            b: "#\\!?\\[",
            e: "\\]"
        }, {
            cN: "class",
            bK: "type",
            e: "(=|<)",
            c: [e.UTM],
            i: "\\S"
        }, {
            cN: "class",
            bK: "trait enum",
            e: "{",
            c: [e.inherit(e.UTM, {
                endsParent: !0
            })],
            i: "[\\w\\d]"
        }, {
            b: e.IR + "::",
            k: {
                built_in: i
            }
        }, {
            b: "->"
        }]
    }
}),
hljs.registerLanguage("vbnet", function(e) {
    return {
        aliases: ["vb"],
        cI: !0,
        k: {
            keyword: "addhandler addressof alias and andalso aggregate ansi as assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into is isfalse isnot istrue join key let lib like loop me mid mod module mustinherit mustoverride mybase myclass namespace narrowing new next not notinheritable notoverridable of off on operator option optional or order orelse overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim rem removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly xor",
            built_in: "boolean byte cbool cbyte cchar cdate cdec cdbl char cint clng cobj csbyte cshort csng cstr ctype date decimal directcast double gettype getxmlnamespace iif integer long object sbyte short single string trycast typeof uinteger ulong ushort",
            literal: "true false nothing"
        },
        i: "//|{|}|endif|gosub|variant|wend",
        c: [e.inherit(e.QSM, {
            c: [{
                b: '""'
            }]
        }), e.C("'", "$", {
            rB: !0,
            c: [{
                cN: "doctag",
                b: "'''|<!--|-->",
                c: [e.PWM]
            }, {
                cN: "doctag",
                b: "</?",
                e: ">",
                c: [e.PWM]
            }]
        }), e.CNM, {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elseif end region externalsource"
            }
        }]
    }
}),
hljs.registerLanguage("http", function() {
    var e = "HTTP/[0-9\\.]+";
    return {
        aliases: ["https"],
        i: "\\S",
        c: [{
            b: "^" + e,
            e: "$",
            c: [{
                cN: "number",
                b: "\\b\\d{3}\\b"
            }]
        }, {
            b: "^[A-Z]+ (.*?) " + e + "$",
            rB: !0,
            e: "$",
            c: [{
                cN: "string",
                b: " ",
                e: " ",
                eB: !0,
                eE: !0
            }, {
                b: e
            }, {
                cN: "keyword",
                b: "[A-Z]+"
            }]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: !0,
            i: "\\n|\\s|=",
            starts: {
                e: "$",
                r: 0
            }
        }, {
            b: "\\n\\n",
            starts: {
                sL: [],
                eW: !0
            }
        }]
    }
}),
hljs.registerLanguage("cpp", function(e) {
    var t = {
        cN: "keyword",
        b: "\\b[a-z\\d_]*_t\\b"
    }
      , n = {
        cN: "string",
        v: [e.inherit(e.QSM, {
            b: '((u8?|U)|L)?"'
        }), {
            b: '(u8?|U)?R"',
            e: '"',
            c: [e.BE]
        }, {
            b: "'\\\\?.",
            e: "'",
            i: "."
        }]
    }
      , i = {
        cN: "number",
        v: [{
            b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
        }, {
            b: e.CNR
        }],
        r: 0
    }
      , r = {
        cN: "meta",
        b: "#",
        e: "$",
        k: {
            "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef"
        },
        c: [{
            b: /\\\n/,
            r: 0
        }, {
            bK: "include",
            e: "$",
            k: {
                "meta-keyword": "include"
            },
            c: [e.inherit(n, {
                cN: "meta-string"
            }), {
                cN: "meta-string",
                b: "<",
                e: ">",
                i: "\\n"
            }]
        }, n, e.CLCM, e.CBCM]
    }
      , a = e.IR + "\\s*\\("
      , o = {
        keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
        built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",
        literal: "true false nullptr NULL"
    };
    return {
        aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
        k: o,
        i: "</",
        c: [t, e.CLCM, e.CBCM, i, n, r, {
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: o,
            c: ["self", t]
        }, {
            b: e.IR + "::",
            k: o
        }, {
            bK: "new throw return else",
            r: 0
        }, {
            cN: "function",
            b: "(" + e.IR + "[\\*&\\s]+)+" + a,
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: o,
            i: /[^\w\s\*&]/,
            c: [{
                b: a,
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: o,
                r: 0,
                c: [e.CLCM, e.CBCM, n, i]
            }, e.CLCM, e.CBCM, r]
        }]
    }
}),
hljs.registerLanguage("haml", function(e) {
    return {
        cI: !0,
        c: [{
            cN: "meta",
            b: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
            r: 10
        }, e.C("^\\s*(!=#|=#|-#|/).*$", !1, {
            r: 0
        }), {
            b: "^\\s*(-|=|!=)(?!#)",
            starts: {
                e: "\\n",
                sL: "ruby"
            }
        }, {
            cN: "tag",
            b: "^\\s*%",
            c: [{
                cN: "selector-tag",
                b: "\\w+"
            }, {
                cN: "selector-id",
                b: "#[\\w-]+"
            }, {
                cN: "selector-class",
                b: "\\.[\\w-]+"
            }, {
                b: "{\\s*",
                e: "\\s*}",
                c: [{
                    b: ":\\w+\\s*=>",
                    e: ",\\s+",
                    rB: !0,
                    eW: !0,
                    c: [{
                        cN: "attr",
                        b: ":\\w+"
                    }, e.ASM, e.QSM, {
                        b: "\\w+",
                        r: 0
                    }]
                }]
            }, {
                b: "\\(\\s*",
                e: "\\s*\\)",
                eE: !0,
                c: [{
                    b: "\\w+\\s*=",
                    e: "\\s+",
                    rB: !0,
                    eW: !0,
                    c: [{
                        cN: "attr",
                        b: "\\w+",
                        r: 0
                    }, e.ASM, e.QSM, {
                        b: "\\w+",
                        r: 0
                    }]
                }]
            }]
        }, {
            b: "^\\s*[=~]\\s*"
        }, {
            b: "#{",
            starts: {
                e: "}",
                sL: "ruby"
            }
        }]
    }
}),
hljs.registerLanguage("erlang", function(e) {
    var t = "[a-z'][a-zA-Z0-9_']*"
      , n = "(" + t + ":" + t + "|" + t + ")"
      , i = {
        keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor",
        literal: "false true"
    }
      , r = e.C("%", "$")
      , a = {
        cN: "number",
        b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
        r: 0
    }
      , o = {
        b: "fun\\s+" + t + "/\\d+"
    }
      , s = {
        b: n + "\\(",
        e: "\\)",
        rB: !0,
        r: 0,
        c: [{
            b: n,
            r: 0
        }, {
            b: "\\(",
            e: "\\)",
            eW: !0,
            rE: !0,
            r: 0
        }]
    }
      , l = {
        b: "{",
        e: "}",
        r: 0
    }
      , c = {
        b: "\\b_([A-Z][A-Za-z0-9_]*)?",
        r: 0
    }
      , u = {
        b: "[A-Z][a-zA-Z0-9_]*",
        r: 0
    }
      , d = {
        b: "#" + e.UIR,
        r: 0,
        rB: !0,
        c: [{
            b: "#" + e.UIR,
            r: 0
        }, {
            b: "{",
            e: "}",
            r: 0
        }]
    }
      , p = {
        bK: "fun receive if try case",
        e: "end",
        k: i
    };
    p.c = [r, o, e.inherit(e.ASM, {
        cN: ""
    }), p, s, e.QSM, a, l, c, u, d];
    var h = [r, o, p, s, e.QSM, a, l, c, u, d];
    s.c[1].c = h,
    l.c = h,
    d.c[1].c = h;
    var f = {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: h
    };
    return {
        aliases: ["erl"],
        k: i,
        i: "(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",
        c: [{
            cN: "function",
            b: "^" + t + "\\s*\\(",
            e: "->",
            rB: !0,
            i: "\\(|#|//|/\\*|\\\\|:|;",
            c: [f, e.inherit(e.TM, {
                b: t
            })],
            starts: {
                e: ";|\\.",
                k: i,
                c: h
            }
        }, r, {
            b: "^-",
            e: "\\.",
            r: 0,
            eE: !0,
            rB: !0,
            l: "-" + e.IR,
            k: "-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn -import -include -include_lib -compile -define -else -endif -file -behaviour -behavior -spec",
            c: [f]
        }, a, e.QSM, d, c, u, l, {
            b: /\.$/
        }]
    }
}),
hljs.registerLanguage("nginx", function(e) {
    var t = {
        cN: "variable",
        v: [{
            b: /\$\d+/
        }, {
            b: /\$\{/,
            e: /}/
        }, {
            b: "[\\$\\@]" + e.UIR
        }]
    }
      , n = {
        eW: !0,
        l: "[a-z/_]+",
        k: {
            literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
        },
        r: 0,
        i: "=>",
        c: [e.HCM, {
            cN: "string",
            c: [e.BE, t],
            v: [{
                b: /"/,
                e: /"/
            }, {
                b: /'/,
                e: /'/
            }]
        }, {
            b: "([a-z]+):/",
            e: "\\s",
            eW: !0,
            eE: !0,
            c: [t]
        }, {
            cN: "regexp",
            c: [e.BE, t],
            v: [{
                b: "\\s\\^",
                e: "\\s|{|;",
                rE: !0
            }, {
                b: "~\\*?\\s+",
                e: "\\s|{|;",
                rE: !0
            }, {
                b: "\\*(\\.[a-z\\-]+)+"
            }, {
                b: "([a-z\\-]+\\.)+\\*"
            }]
        }, {
            cN: "number",
            b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
        }, {
            cN: "number",
            b: "\\b\\d+[kKmMgGdshdwy]*\\b",
            r: 0
        }, t]
    };
    return {
        aliases: ["nginxconf"],
        c: [e.HCM, {
            b: e.UIR + "\\s+{",
            rB: !0,
            e: "{",
            c: [{
                cN: "section",
                b: e.UIR
            }],
            r: 0
        }, {
            b: e.UIR + "\\s",
            e: ";|{",
            rB: !0,
            c: [{
                cN: "attribute",
                b: e.UIR,
                starts: n
            }],
            r: 0
        }],
        i: "[^\\s\\}]"
    }
}),
hljs.registerLanguage("apache", function(e) {
    var t = {
        cN: "number",
        b: "[\\$%]\\d+"
    };
    return {
        aliases: ["apacheconf"],
        cI: !0,
        c: [e.HCM, {
            cN: "section",
            b: "</?",
            e: ">"
        }, {
            cN: "attribute",
            b: /\w+/,
            r: 0,
            k: {
                nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
                e: /$/,
                r: 0,
                k: {
                    literal: "on off all"
                },
                c: [{
                    cN: "meta",
                    b: "\\s\\[",
                    e: "\\]$"
                }, {
                    cN: "variable",
                    b: "[\\$%]\\{",
                    e: "\\}",
                    c: ["self", t]
                }, t, e.QSM]
            }
        }],
        i: /\S/
    }
}),
hljs.registerLanguage("crystal", function(e) {
    function t(e, t) {
        var n = [{
            b: e,
            e: t
        }];
        return n[0].c = n,
        n
    }
    var n = "(_[uif](8|16|32|64))?"
      , i = "[a-zA-Z_]\\w*[!?=]?"
      , r = "!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~"
      , a = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\][=?]?"
      , o = {
        keyword: "abstract alias as asm begin break case class def do else elsif end ensure enum extend for fun if ifdef include instance_sizeof is_a? lib macro module next of out pointerof private protected rescue responds_to? return require self sizeof struct super then type typeof union unless until when while with yield __DIR__ __FILE__ __LINE__",
        literal: "false nil true"
    }
      , s = {
        cN: "subst",
        b: "#{",
        e: "}",
        k: o
    }
      , l = {
        cN: "template-variable",
        v: [{
            b: "\\{\\{",
            e: "\\}\\}"
        }, {
            b: "\\{%",
            e: "%\\}"
        }],
        k: o,
        r: 10
    }
      , c = {
        cN: "string",
        c: [e.BE, s],
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }, {
            b: /`/,
            e: /`/
        }, {
            b: "%w?\\(",
            e: "\\)",
            c: t("\\(", "\\)")
        }, {
            b: "%w?\\[",
            e: "\\]",
            c: t("\\[", "\\]")
        }, {
            b: "%w?{",
            e: "}",
            c: t("{", "}")
        }, {
            b: "%w?<",
            e: ">",
            c: t("<", ">")
        }, {
            b: "%w?/",
            e: "/"
        }, {
            b: "%w?%",
            e: "%"
        }, {
            b: "%w?-",
            e: "-"
        }, {
            b: "%w?\\|",
            e: "\\|"
        }],
        r: 0
    }
      , u = {
        b: "(" + r + ")\\s*",
        c: [{
            cN: "regexp",
            c: [e.BE, s],
            v: [{
                b: "/",
                e: "/[a-z]*"
            }, {
                b: "%r\\(",
                e: "\\)",
                c: t("\\(", "\\)")
            }, {
                b: "%r\\[",
                e: "\\]",
                c: t("\\[", "\\]")
            }, {
                b: "%r{",
                e: "}",
                c: t("{", "}")
            }, {
                b: "%r<",
                e: ">",
                c: t("<", ">")
            }, {
                b: "%r/",
                e: "/"
            }, {
                b: "%r%",
                e: "%"
            }, {
                b: "%r-",
                e: "-"
            }, {
                b: "%r\\|",
                e: "\\|"
            }]
        }],
        r: 0
    }
      , d = {
        cN: "regexp",
        c: [e.BE, s],
        v: [{
            b: "%r\\(",
            e: "\\)",
            c: t("\\(", "\\)")
        }, {
            b: "%r\\[",
            e: "\\]",
            c: t("\\[", "\\]")
        }, {
            b: "%r{",
            e: "}",
            c: t("{", "}")
        }, {
            b: "%r<",
            e: ">",
            c: t("<", ">")
        }, {
            b: "%r/",
            e: "/"
        }, {
            b: "%r%",
            e: "%"
        }, {
            b: "%r-",
            e: "-"
        }, {
            b: "%r\\|",
            e: "\\|"
        }],
        r: 0
    }
      , p = {
        cN: "meta",
        b: "@\\[",
        e: "\\]",
        r: 5
    }
      , h = [l, c, u, d, p, e.HCM, {
        cN: "class",
        bK: "class module struct",
        e: "$|;",
        i: /=/,
        c: [e.HCM, e.inherit(e.TM, {
            b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        }), {
            b: "<"
        }]
    }, {
        cN: "class",
        bK: "lib enum union",
        e: "$|;",
        i: /=/,
        c: [e.HCM, e.inherit(e.TM, {
            b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        })],
        r: 10
    }, {
        cN: "function",
        bK: "def",
        e: /\B\b/,
        c: [e.inherit(e.TM, {
            b: a,
            endsParent: !0
        })]
    }, {
        cN: "function",
        bK: "fun macro",
        e: /\B\b/,
        c: [e.inherit(e.TM, {
            b: a,
            endsParent: !0
        })],
        r: 5
    }, {
        cN: "symbol",
        b: e.UIR + "(\\!|\\?)?:",
        r: 0
    }, {
        cN: "symbol",
        b: ":",
        c: [c, {
            b: a
        }],
        r: 0
    }, {
        cN: "number",
        v: [{
            b: "\\b0b([01_]*[01])" + n
        }, {
            b: "\\b0o([0-7_]*[0-7])" + n
        }, {
            b: "\\b0x([A-Fa-f0-9_]*[A-Fa-f0-9])" + n
        }, {
            b: "\\b(([0-9][0-9_]*[0-9]|[0-9])(\\.[0-9_]*[0-9])?([eE][+-]?[0-9_]*[0-9])?)" + n
        }],
        r: 0
    }];
    return s.c = h,
    p.c = h,
    l.c = h.slice(1),
    {
        aliases: ["cr"],
        l: i,
        k: o,
        c: h
    }
}),
hljs.registerLanguage("cs", function(e) {
    var t = "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield"
      , n = e.IR + "(<" + e.IR + ">)?";
    return {
        aliases: ["csharp"],
        k: t,
        i: /::/,
        c: [e.C("///", "$", {
            rB: !0,
            c: [{
                cN: "doctag",
                v: [{
                    b: "///",
                    r: 0
                }, {
                    b: "<!--|-->"
                }, {
                    b: "</?",
                    e: ">"
                }]
            }]
        }), e.CLCM, e.CBCM, {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
            }
        }, {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        }, e.ASM, e.QSM, e.CNM, {
            bK: "class interface",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.TM, e.CLCM, e.CBCM]
        }, {
            bK: "namespace",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.inherit(e.TM, {
                b: "[a-zA-Z](\\.?\\w)*"
            }), e.CLCM, e.CBCM]
        }, {
            bK: "new return throw await",
            r: 0
        }, {
            cN: "function",
            b: "(" + n + "\\s+)+" + e.IR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: t,
            c: [{
                b: e.IR + "\\s*\\(",
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                k: t,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }]
    }
}),
hljs.registerLanguage("php", function(e) {
    var t = {
        b: "\\$+[a-zA-Z_-\xff][a-zA-Z0-9_-\xff]*"
    }
      , n = {
        cN: "meta",
        b: /<\?(php)?|\?>/
    }
      , i = {
        cN: "string",
        c: [e.BE, n],
        v: [{
            b: 'b"',
            e: '"'
        }, {
            b: "b'",
            e: "'"
        }, e.inherit(e.ASM, {
            i: null
        }), e.inherit(e.QSM, {
            i: null
        })]
    }
      , r = {
        v: [e.BNM, e.CNM]
    };
    return {
        aliases: ["php3", "php4", "php5", "php6"],
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [e.CLCM, e.HCM, e.C("/\\*", "\\*/", {
            c: [{
                cN: "doctag",
                b: "@[A-Za-z]+"
            }, n]
        }), e.C("__halt_compiler.+?;", !1, {
            eW: !0,
            k: "__halt_compiler",
            l: e.UIR
        }), {
            cN: "string",
            b: /<<<['"]?\w+['"]?$/,
            e: /^\w+;?$/,
            c: [e.BE, {
                cN: "subst",
                v: [{
                    b: /\$\w+/
                }, {
                    b: /\{\$/,
                    e: /\}/
                }]
            }]
        }, n, t, {
            b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
        }, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            eE: !0,
            i: "\\$|\\[|%",
            c: [e.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: ["self", t, e.CBCM, i, r]
            }]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            i: /[:\(\$"]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "namespace",
            e: ";",
            i: /[\.']/,
            c: [e.UTM]
        }, {
            bK: "use",
            e: ";",
            c: [e.UTM]
        }, {
            b: "=>"
        }, i, r]
    }
}),
function(e) {
    (function() {
        window.Tags || (window.Tags = {}),
        jQuery(function() {
            return e.tags = function(t, n) {
                var i, r, a, o, s, l, c, u = this;
                null == n && (n = {});
                for (i in n)
                    o = n[i],
                    this[i] = o;
                if (this.bootstrapVersion || (this.bootstrapVersion = "3"),
                this.readOnly || (this.readOnly = !1),
                this.suggestOnClick || (this.suggestOnClick = !1),
                this.suggestions || (this.suggestions = []),
                this.restrictTo = null != n.restrictTo ? n.restrictTo.concat(this.suggestions) : !1,
                this.exclude || (this.exclude = !1),
                this.displayPopovers = null != n.popovers ? !0 : null != n.popoverData,
                this.popoverTrigger || (this.popoverTrigger = "hover"),
                this.tagClass || (this.tagClass = "btn-info"),
                this.tagSize || (this.tagSize = "md"),
                this.promptText || (this.promptText = "Enter tags..."),
                this.caseInsensitive || (this.caseInsensitive = !1),
                this.readOnlyEmptyMessage || (this.readOnlyEmptyMessage = "No tags to display..."),
                this.maxNumTags || (this.maxNumTags = -1),
                this.beforeAddingTag || (this.beforeAddingTag = function() {}
                ),
                this.afterAddingTag || (this.afterAddingTag = function() {}
                ),
                this.beforeDeletingTag || (this.beforeDeletingTag = function() {}
                ),
                this.afterDeletingTag || (this.afterDeletingTag = function() {}
                ),
                this.definePopover || (this.definePopover = function(e) {
                    return 'associated content for "' + e + '"'
                }
                ),
                this.excludes || (this.excludes = function() {
                    return !1
                }
                ),
                this.tagRemoved || (this.tagRemoved = function() {}
                ),
                this.pressedReturn || (this.pressedReturn = function() {}
                ),
                this.pressedDelete || (this.pressedDelete = function() {}
                ),
                this.pressedDown || (this.pressedDown = function() {}
                ),
                this.pressedUp || (this.pressedUp = function() {}
                ),
                this.$element = e(t),
                null != n.tagData ? this.tagsArray = n.tagData : (a = e(".tag-data", this.$element).html(),
                this.tagsArray = null != a ? a.split(",") : []),
                n.popoverData)
                    this.popoverArray = n.popoverData;
                else
                    for (this.popoverArray = [],
                    c = this.tagsArray,
                    s = 0,
                    l = c.length; l > s; s++)
                        r = c[s],
                        this.popoverArray.push(null);
                return this.getTags = function() {
                    return u.tagsArray
                }
                ,
                this.getTagsContent = function() {
                    return u.popoverArray
                }
                ,
                this.getTagsWithContent = function() {
                    var e, t, n, i;
                    for (e = [],
                    t = n = 0,
                    i = u.tagsArray.length - 1; i >= 0 ? i >= n : n >= i; t = i >= 0 ? ++n : --n)
                        e.push({
                            tag: u.tagsArray[t],
                            content: u.popoverArray[t]
                        });
                    return e
                }
                ,
                this.getTag = function(e) {
                    var t;
                    return t = u.tagsArray.indexOf(e),
                    t > -1 ? u.tagsArray[t] : null
                }
                ,
                this.getTagWithContent = function(e) {
                    var t;
                    return t = u.tagsArray.indexOf(e),
                    {
                        tag: u.tagsArray[t],
                        content: u.popoverArray[t]
                    }
                }
                ,
                this.hasTag = function(e) {
                    return u.tagsArray.indexOf(e) > -1
                }
                ,
                this.removeTagClicked = function(t) {
                    return "A" === t.currentTarget.tagName && (u.removeTag(e("span", t.currentTarget.parentElement).html()),
                    e(t.currentTarget.parentNode).remove()),
                    u
                }
                ,
                this.removeLastTag = function() {
                    return u.tagsArray.length > 0 && (u.removeTag(u.tagsArray[u.tagsArray.length - 1]),
                    u.canAddByMaxNum() && u.enableInput()),
                    u
                }
                ,
                this.removeTag = function(e) {
                    if (u.tagsArray.indexOf(e) > -1) {
                        if (u.beforeDeletingTag(e) === !1)
                            return;
                        u.popoverArray.splice(u.tagsArray.indexOf(e), 1),
                        u.tagsArray.splice(u.tagsArray.indexOf(e), 1),
                        u.renderTags(),
                        u.afterDeletingTag(e),
                        u.canAddByMaxNum() && u.enableInput()
                    }
                    return u
                }
                ,
                this.canAddByRestriction = function(e) {
                    return this.restrictTo === !1 || -1 !== this.restrictTo.indexOf(e)
                }
                ,
                this.canAddByExclusion = function(e) {
                    return (this.exclude === !1 || -1 === this.exclude.indexOf(e)) && !this.excludes(e)
                }
                ,
                this.canAddByMaxNum = function() {
                    return -1 === this.maxNumTags || this.tagsArray.length < this.maxNumTags
                }
                ,
                this.addTag = function(e) {
                    var t;
                    if (u.canAddByRestriction(e) && !u.hasTag(e) && e.length > 0 && u.canAddByExclusion(e) && u.canAddByMaxNum()) {
                        if (u.beforeAddingTag(e) === !1)
                            return;
                        t = u.definePopover(e),
                        u.popoverArray.push(t || null),
                        u.tagsArray.push(e),
                        u.afterAddingTag(e),
                        u.renderTags(),
                        u.canAddByMaxNum() || u.disableInput()
                    }
                    return u
                }
                ,
                this.addTagWithContent = function(e, t) {
                    if (u.canAddByRestriction(e) && !u.hasTag(e) && e.length > 0) {
                        if (u.beforeAddingTag(e) === !1)
                            return;
                        u.tagsArray.push(e),
                        u.popoverArray.push(t),
                        u.afterAddingTag(e),
                        u.renderTags()
                    }
                    return u
                }
                ,
                this.renameTag = function(e, t) {
                    return u.tagsArray[u.tagsArray.indexOf(e)] = t,
                    u.renderTags(),
                    u
                }
                ,
                this.setPopover = function(e, t) {
                    return u.popoverArray[u.tagsArray.indexOf(e)] = t,
                    u.renderTags(),
                    u
                }
                ,
                this.clickHandler = function(e) {
                    return u.makeSuggestions(e, !0)
                }
                ,
                this.keyDownHandler = function(e) {
                    var t, n;
                    switch (t = null != e.keyCode ? e.keyCode : e.which) {
                    case 13:
                        return e.preventDefault(),
                        u.pressedReturn(e),
                        r = e.target.value,
                        -1 !== u.suggestedIndex && (r = u.suggestionList[u.suggestedIndex]),
                        u.addTag(r),
                        e.target.value = "",
                        u.renderTags(),
                        u.hideSuggestions();
                    case 46:
                    case 8:
                        if (u.pressedDelete(e),
                        "" === e.target.value && u.removeLastTag(),
                        1 === e.target.value.length)
                            return u.hideSuggestions();
                        break;
                    case 40:
                        if (u.pressedDown(e),
                        "" !== u.input.val() || -1 !== u.suggestedIndex && null != u.suggestedIndex || u.makeSuggestions(e, !0),
                        n = u.suggestionList.length,
                        u.suggestedIndex = u.suggestedIndex < n - 1 ? u.suggestedIndex + 1 : n - 1,
                        u.selectSuggested(u.suggestedIndex),
                        u.suggestedIndex >= 0)
                            return u.scrollSuggested(u.suggestedIndex);
                        break;
                    case 38:
                        if (u.pressedUp(e),
                        u.suggestedIndex = u.suggestedIndex > 0 ? u.suggestedIndex - 1 : 0,
                        u.selectSuggested(u.suggestedIndex),
                        u.suggestedIndex >= 0)
                            return u.scrollSuggested(u.suggestedIndex);
                        break;
                    case 9:
                    case 27:
                        return u.hideSuggestions(),
                        u.suggestedIndex = -1
                    }
                }
                ,
                this.keyUpHandler = function(e) {
                    var t;
                    return t = null != e.keyCode ? e.keyCode : e.which,
                    40 !== t && 38 !== t && 27 !== t ? u.makeSuggestions(e, !1) : void 0
                }
                ,
                this.getSuggestions = function(t, n) {
                    var i = this;
                    return this.suggestionList = [],
                    this.caseInsensitive && (t = t.toLowerCase()),
                    e.each(this.suggestions, function(e, r) {
                        var a;
                        return a = i.caseInsensitive ? r.substring(0, t.length).toLowerCase() : r.substring(0, t.length),
                        i.tagsArray.indexOf(r) < 0 && a === t && (t.length > 0 || n) ? i.suggestionList.push(r) : void 0
                    }),
                    this.suggestionList
                }
                ,
                this.makeSuggestions = function(t, n, i) {
                    return null == i && (i = null != t.target.value ? t.target.value : t.target.textContent),
                    u.suggestedIndex = -1,
                    u.$suggestionList.html(""),
                    e.each(u.getSuggestions(i, n), function(e, t) {
                        return u.$suggestionList.append(u.template("tags_suggestion", {
                            suggestion: t
                        }))
                    }),
                    u.$(".tags-suggestion").mouseover(u.selectSuggestedMouseOver),
                    u.$(".tags-suggestion").click(u.suggestedClicked),
                    u.suggestionList.length > 0 ? u.showSuggestions() : u.hideSuggestions()
                }
                ,
                this.suggestedClicked = function(e) {
                    return r = e.target.textContent,
                    -1 !== u.suggestedIndex && (r = u.suggestionList[u.suggestedIndex]),
                    u.addTag(r),
                    u.input.val(""),
                    u.makeSuggestions(e, !1, ""),
                    u.input.focus(),
                    u.hideSuggestions()
                }
                ,
                this.hideSuggestions = function() {
                    return u.$(".tags-suggestion-list").css({
                        display: "none"
                    })
                }
                ,
                this.showSuggestions = function() {
                    return u.$(".tags-suggestion-list").css({
                        display: "block"
                    })
                }
                ,
                this.selectSuggestedMouseOver = function(t) {
                    return e(".tags-suggestion").removeClass("tags-suggestion-highlighted"),
                    e(t.target).addClass("tags-suggestion-highlighted"),
                    e(t.target).mouseout(u.selectSuggestedMousedOut),
                    u.suggestedIndex = u.$(".tags-suggestion").index(e(t.target))
                }
                ,
                this.selectSuggestedMousedOut = function(t) {
                    return e(t.target).removeClass("tags-suggestion-highlighted")
                }
                ,
                this.selectSuggested = function(t) {
                    var n;
                    return e(".tags-suggestion").removeClass("tags-suggestion-highlighted"),
                    n = u.$(".tags-suggestion").eq(t),
                    n.addClass("tags-suggestion-highlighted")
                }
                ,
                this.scrollSuggested = function(e) {
                    var t, n, i, r;
                    return n = u.$(".tags-suggestion").eq(e),
                    i = u.$(".tags-suggestion").eq(0),
                    t = n.position(),
                    r = i.position(),
                    null != t ? u.$(".tags-suggestion-list").scrollTop(t.top - r.top) : void 0
                }
                ,
                this.adjustInputPosition = function() {
                    var t, n, i, r, a, o;
                    return a = u.$(".tag").last(),
                    o = a.position(),
                    n = null != o ? o.left + a.outerWidth(!0) : 0,
                    i = null != o ? o.top : 0,
                    r = u.$element.width() - n,
                    e(".tags-input", u.$element).css({
                        paddingLeft: Math.max(n, 0),
                        paddingTop: Math.max(i, 0),
                        width: r
                    }),
                    t = null != o ? o.top + a.outerHeight(!0) : 22,
                    u.$element.css({
                        paddingBottom: t - u.$element.height()
                    })
                }
                ,
                this.renderTags = function() {
                    var t;
                    return t = u.$(".tags"),
                    t.html(""),
                    u.input.attr("placeholder", 0 === u.tagsArray.length ? u.promptText : ""),
                    e.each(u.tagsArray, function(n, i) {
                        return i = e(u.formatTag(n, i)),
                        e("a", i).click(u.removeTagClicked),
                        e("a", i).mouseover(u.toggleCloseColor),
                        e("a", i).mouseout(u.toggleCloseColor),
                        u.displayPopovers && u.initializePopoverFor(i, u.tagsArray[n], u.popoverArray[n]),
                        t.append(i)
                    }),
                    u.adjustInputPosition()
                }
                ,
                this.renderReadOnly = function() {
                    var t;
                    return t = u.$(".tags"),
                    t.html(0 === u.tagsArray.length ? u.readOnlyEmptyMessage : ""),
                    e.each(u.tagsArray, function(n, i) {
                        return i = e(u.formatTag(n, i, !0)),
                        u.displayPopovers && u.initializePopoverFor(i, u.tagsArray[n], u.popoverArray[n]),
                        t.append(i)
                    })
                }
                ,
                this.disableInput = function() {
                    return this.$("input").prop("disabled", !0)
                }
                ,
                this.enableInput = function() {
                    return this.$("input").prop("disabled", !1)
                }
                ,
                this.initializePopoverFor = function(t, i, r) {
                    return n = {
                        title: i,
                        content: r,
                        placement: "bottom"
                    },
                    "hoverShowClickHide" === u.popoverTrigger ? (e(t).mouseover(function() {
                        return e(t).popover("show"),
                        e(".tag").not(t).popover("hide")
                    }),
                    e(document).click(function() {
                        return e(t).popover("hide")
                    })) : n.trigger = u.popoverTrigger,
                    e(t).popover(n)
                }
                ,
                this.toggleCloseColor = function(t) {
                    var n, i;
                    return i = e(t.currentTarget),
                    n = i.css("opacity"),
                    n = .8 > n ? 1 : .6,
                    i.css({
                        opacity: n
                    })
                }
                ,
                this.formatTag = function(e, t, n) {
                    var i;
                    return null == n && (n = !1),
                    i = t.replace("<", "&lt;").replace(">", "&gt;"),
                    u.template("tag", {
                        tag: i,
                        tagClass: u.tagClass,
                        isPopover: u.displayPopovers,
                        isReadOnly: n,
                        tagSize: u.tagSize
                    })
                }
                ,
                this.addDocumentListeners = function() {
                    return e(document).mouseup(function(t) {
                        var n;
                        return n = u.$(".tags-suggestion-list"),
                        0 !== n.has(t.target).length || e(t.target).hasClass("tags-suggestion-list") ? void 0 : u.hideSuggestions()
                    })
                }
                ,
                this.template = function(e, t) {
                    return Tags.Templates.Template(this.getBootstrapVersion(), e, t)
                }
                ,
                this.$ = function(t) {
                    return e(t, this.$element)
                }
                ,
                this.getBootstrapVersion = function() {
                    return Tags.bootstrapVersion || this.bootstrapVersion
                }
                ,
                this.initializeDom = function() {
                    return this.$element.append(this.template("tags_container"))
                }
                ,
                this.init = function() {
                    return this.$element.addClass("bootstrap-tags").addClass("bootstrap-" + this.getBootstrapVersion()),
                    this.initializeDom(),
                    this.readOnly ? (this.renderReadOnly(),
                    this.removeTag = function() {}
                    ,
                    this.removeTagClicked = function() {}
                    ,
                    this.removeLastTag = function() {}
                    ,
                    this.addTag = function() {}
                    ,
                    this.addTagWithContent = function() {}
                    ,
                    this.renameTag = function() {}
                    ,
                    this.setPopover = function() {}
                    ) : (this.input = e(this.template("input", {
                        tagSize: this.tagSize
                    })),
                    this.suggestOnClick && this.input.click(this.clickHandler),
                    this.input.keydown(this.keyDownHandler),
                    this.input.keyup(this.keyUpHandler),
                    this.$element.append(this.input),
                    this.$suggestionList = e(this.template("suggestion_list")),
                    this.$element.append(this.$suggestionList),
                    this.renderTags(),
                    this.canAddByMaxNum() || this.disableInput(),
                    this.addDocumentListeners())
                }
                ,
                this.init(),
                this
            }
            ,
            e.fn.tags = function(t) {
                var n, i;
                return i = {},
                n = "number" == typeof t ? t : -1,
                this.each(function(r, a) {
                    var o;
                    return o = e(a),
                    null == o.data("tags") && o.data("tags", new e.tags(this,t)),
                    n === r || 0 === r ? i = o.data("tags") : void 0
                }),
                i
            }
        })
    }
    ).call(this),
    function() {
        window.Tags || (window.Tags = {}),
        Tags.Helpers || (Tags.Helpers = {}),
        Tags.Helpers.addPadding = function(e, t, n) {
            return null == t && (t = 1),
            null == n && (n = !0),
            n ? 0 === t ? e : Tags.Helpers.addPadding("&nbsp" + e + "&nbsp", t - 1) : e
        }
    }
    .call(this),
    function() {
        var e;
        window.Tags || (window.Tags = {}),
        Tags.Templates || (Tags.Templates = {}),
        (e = Tags.Templates)[2] || (e[2] = {}),
        Tags.Templates[2].input = function(e) {
            var t;
            return null == e && (e = {}),
            t = function() {
                switch (e.tagSize) {
                case "sm":
                    return "small";
                case "md":
                    return "medium";
                case "lg":
                    return "large"
                }
            }(),
            "<input type='text' class='tags-input input-" + t + "' />"
        }
    }
    .call(this),
    function() {
        var e;
        window.Tags || (window.Tags = {}),
        Tags.Templates || (Tags.Templates = {}),
        (e = Tags.Templates)[2] || (e[2] = {}),
        Tags.Templates[2].tag = function(e) {
            return null == e && (e = {}),
            "<div class='tag label " + e.tagClass + " " + e.tagSize + "' " + (e.isPopover ? "rel='popover'" : "") + ">    <span>" + Tags.Helpers.addPadding(e.tag, 2, e.isReadOnly) + "</span>    " + (e.isReadOnly ? "" : "<a><i class='remove icon-remove-sign icon-white' /></a>") + "  </div>"
        }
    }
    .call(this),
    function() {
        var e;
        window.Tags || (window.Tags = {}),
        Tags.Templates || (Tags.Templates = {}),
        (e = Tags.Templates)[3] || (e[3] = {}),
        Tags.Templates[3].input = function(e) {
            return null == e && (e = {}),
            "<input type='text' id='used-technology' class='form-control tags-input input-" + e.tagSize + "' />"
        }
    }
    .call(this),
    function() {
        var e;
        window.Tags || (window.Tags = {}),
        Tags.Templates || (Tags.Templates = {}),
        (e = Tags.Templates)[3] || (e[3] = {}),
        Tags.Templates[3].tag = function(e) {
            return null == e && (e = {}),
            "<div class='tag label " + e.tagClass + " " + e.tagSize + "' " + (e.isPopover ? "rel='popover'" : "") + ">    <span>" + Tags.Helpers.addPadding(e.tag, 2, e.isReadOnly) + "</span>    " + (e.isReadOnly ? "" : "<a><i class='remove glyphicon glyphicon-remove-sign glyphicon-white' /></a>") + "  </div>"
        }
    }
    .call(this),
    function() {
        var e;
        window.Tags || (window.Tags = {}),
        Tags.Templates || (Tags.Templates = {}),
        (e = Tags.Templates).shared || (e.shared = {}),
        Tags.Templates.shared.suggestion_list = function(e) {
            return null == e && (e = {}),
            '<ul class="tags-suggestion-list dropdown-menu"></ul>'
        }
    }
    .call(this),
    function() {
        var e;
        window.Tags || (window.Tags = {}),
        Tags.Templates || (Tags.Templates = {}),
        (e = Tags.Templates).shared || (e.shared = {}),
        Tags.Templates.shared.tags_container = function(e) {
            return null == e && (e = {}),
            '<div class="tags"></div>'
        }
    }
    .call(this),
    function() {
        var e;
        window.Tags || (window.Tags = {}),
        Tags.Templates || (Tags.Templates = {}),
        (e = Tags.Templates).shared || (e.shared = {}),
        Tags.Templates.shared.tags_suggestion = function(e) {
            return null == e && (e = {}),
            "<li class='tags-suggestion'>" + e.suggestion + "</li>"
        }
    }
    .call(this),
    function() {
        window.Tags || (window.Tags = {}),
        Tags.Templates || (Tags.Templates = {}),
        Tags.Templates.Template = function(e, t, n) {
            return null != Tags.Templates[e] && null != Tags.Templates[e][t] ? Tags.Templates[e][t](n) : Tags.Templates.shared[t](n)
        }
    }
    .call(this)
}(window.jQuery),
!function(e, t) {
    var n = e();
    e.fn.dropdownHover = function(i) {
        return "ontouchstart"in document ? this : (n = n.add(this.parent()),
        this.each(function() {
            function r() {
                s.parents(".navbar").find(".navbar-toggle").is(":visible") || (t.clearTimeout(a),
                t.clearTimeout(o),
                o = t.setTimeout(function() {
                    n.find(":focus").blur(),
                    h.instantlyCloseOthers === !0 && n.removeClass("open"),
                    t.clearTimeout(o),
                    s.attr("aria-expanded", "true"),
                    l.addClass("open"),
                    s.trigger(d)
                }, h.hoverDelay))
            }
            var a, o, s = e(this), l = s.parent(), c = {
                delay: 500,
                hoverDelay: 0,
                instantlyCloseOthers: !0
            }, u = {
                delay: e(this).data("delay"),
                hoverDelay: e(this).data("hover-delay"),
                instantlyCloseOthers: e(this).data("close-others")
            }, d = "show.bs.dropdown", p = "hide.bs.dropdown", h = e.extend(!0, {}, c, i, u);
            l.hover(function(e) {
                return l.hasClass("open") || s.is(e.target) ? void r(e) : !0
            }, function() {
                t.clearTimeout(o),
                a = t.setTimeout(function() {
                    s.attr("aria-expanded", "false"),
                    l.removeClass("open"),
                    s.trigger(p)
                }, h.delay)
            }),
            s.hover(function(e) {
                return l.hasClass("open") || l.is(e.target) ? void r(e) : !0
            }),
            l.find(".dropdown-submenu").each(function() {
                var n, i = e(this);
                i.hover(function() {
                    t.clearTimeout(n),
                    i.children(".dropdown-menu").show(),
                    i.siblings().children(".dropdown-menu").hide()
                }, function() {
                    var e = i.children(".dropdown-menu");
                    n = t.setTimeout(function() {
                        e.hide()
                    }, h.delay)
                })
            })
        }))
    }
    ,
    e(document).ready(function() {
        e('[data-hover="dropdown"]').dropdownHover()
    })
}(jQuery, window),
function() {
    $(function() {
        return $(".announcement-link").on("click", function() {
            var e;
            return e = $(this).attr("data-target"),
            $("#" + e).modal()
        })
    })
}
.call(this),
function() {
    $(function() {
        return $(".article_comment_edit").click(function() {
            var e, t;
            return e = $(this).find("[name=comment_id]").val(),
            t = $(this).closest(".panel"),
            $.ajax({
                url: "/article_comments/" + e + "/edit",
                dataType: "html",
                success: function(e) {
                    return t.replaceWith(e)
                }
            })
        })
    })
}
.call(this),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function(e, t) {
    function n() {
        return new Date(Date.UTC.apply(Date, arguments))
    }
    function i() {
        var e = new Date;
        return n(e.getFullYear(), e.getMonth(), e.getDate())
    }
    function r(e, t) {
        return e.getUTCFullYear() === t.getUTCFullYear() && e.getUTCMonth() === t.getUTCMonth() && e.getUTCDate() === t.getUTCDate()
    }
    function a(e) {
        return function() {
            return this[e].apply(this, arguments)
        }
    }
    function o(e) {
        return e && !isNaN(e.getTime())
    }
    function s(t, n) {
        function i(e, t) {
            return t.toLowerCase()
        }
        var r, a = e(t).data(), o = {}, s = new RegExp("^" + n.toLowerCase() + "([A-Z])");
        n = new RegExp("^" + n.toLowerCase());
        for (var l in a)
            n.test(l) && (r = l.replace(s, i),
            o[r] = a[l]);
        return o
    }
    function l(t) {
        var n = {};
        if (m[t] || (t = t.split("-")[0],
        m[t])) {
            var i = m[t];
            return e.each(g, function(e, t) {
                t in i && (n[t] = i[t])
            }),
            n
        }
    }
    var c = function() {
        var t = {
            get: function(e) {
                return this.slice(e)[0]
            },
            contains: function(e) {
                for (var t = e && e.valueOf(), n = 0, i = this.length; i > n; n++)
                    if (this[n].valueOf() === t)
                        return n;
                return -1
            },
            remove: function(e) {
                this.splice(e, 1)
            },
            replace: function(t) {
                t && (e.isArray(t) || (t = [t]),
                this.clear(),
                this.push.apply(this, t))
            },
            clear: function() {
                this.length = 0
            },
            copy: function() {
                var e = new c;
                return e.replace(this),
                e
            }
        };
        return function() {
            var n = [];
            return n.push.apply(n, arguments),
            e.extend(n, t),
            n
        }
    }()
      , u = function(t, n) {
        e(t).data("datepicker", this),
        this._process_options(n),
        this.dates = new c,
        this.viewDate = this.o.defaultViewDate,
        this.focusDate = null,
        this.element = e(t),
        this.isInput = this.element.is("input"),
        this.inputField = this.isInput ? this.element : this.element.find("input"),
        this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .btn") : !1,
        this.hasInput = this.component && this.inputField.length,
        this.component && 0 === this.component.length && (this.component = !1),
        this.isInline = !this.component && this.element.is("div"),
        this.picker = e(b.template),
        this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow),
        this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow),
        this._buildEvents(),
        this._attachEvents(),
        this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"),
        this.o.rtl && this.picker.addClass("datepicker-rtl"),
        this.viewMode = this.o.startView,
        this.o.calendarWeeks && this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function(e, t) {
            return parseInt(t) + 1
        }),
        this._allow_update = !1,
        this.setStartDate(this._o.startDate),
        this.setEndDate(this._o.endDate),
        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),
        this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted),
        this.setDatesDisabled(this.o.datesDisabled),
        this.fillDow(),
        this.fillMonths(),
        this._allow_update = !0,
        this.update(),
        this.showMode(),
        this.isInline && this.show()
    };
    u.prototype = {
        constructor: u,
        _resolveViewName: function(e, n) {
            return 0 === e || "days" === e || "month" === e ? 0 : 1 === e || "months" === e || "year" === e ? 1 : 2 === e || "years" === e || "decade" === e ? 2 : 3 === e || "decades" === e || "century" === e ? 3 : 4 === e || "centuries" === e || "millennium" === e ? 4 : n === t ? !1 : n
        },
        _check_template: function(n) {
            try {
                if (n === t || "" === n)
                    return !1;
                if ((n.match(/[<>]/g) || []).length <= 0)
                    return !0;
                var i = e(n);
                return i.length > 0
            } catch (r) {
                return !1
            }
        },
        _process_options: function(t) {
            this._o = e.extend({}, this._o, t);
            var r = this.o = e.extend({}, this._o)
              , a = r.language;
            m[a] || (a = a.split("-")[0],
            m[a] || (a = f.language)),
            r.language = a,
            r.startView = this._resolveViewName(r.startView, 0),
            r.minViewMode = this._resolveViewName(r.minViewMode, 0),
            r.maxViewMode = this._resolveViewName(r.maxViewMode, 4),
            r.startView = Math.min(r.startView, r.maxViewMode),
            r.startView = Math.max(r.startView, r.minViewMode),
            r.multidate !== !0 && (r.multidate = Number(r.multidate) || !1,
            r.multidate !== !1 && (r.multidate = Math.max(0, r.multidate))),
            r.multidateSeparator = String(r.multidateSeparator),
            r.weekStart %= 7,
            r.weekEnd = (r.weekStart + 6) % 7;
            var o = b.parseFormat(r.format);
            r.startDate !== -1 / 0 && (r.startDate = r.startDate ? r.startDate instanceof Date ? this._local_to_utc(this._zero_time(r.startDate)) : b.parseDate(r.startDate, o, r.language, r.assumeNearbyYear) : -1 / 0),
            1 / 0 !== r.endDate && (r.endDate = r.endDate ? r.endDate instanceof Date ? this._local_to_utc(this._zero_time(r.endDate)) : b.parseDate(r.endDate, o, r.language, r.assumeNearbyYear) : 1 / 0),
            r.daysOfWeekDisabled = r.daysOfWeekDisabled || [],
            e.isArray(r.daysOfWeekDisabled) || (r.daysOfWeekDisabled = r.daysOfWeekDisabled.split(/[,\s]*/)),
            r.daysOfWeekDisabled = e.map(r.daysOfWeekDisabled, function(e) {
                return parseInt(e, 10)
            }),
            r.daysOfWeekHighlighted = r.daysOfWeekHighlighted || [],
            e.isArray(r.daysOfWeekHighlighted) || (r.daysOfWeekHighlighted = r.daysOfWeekHighlighted.split(/[,\s]*/)),
            r.daysOfWeekHighlighted = e.map(r.daysOfWeekHighlighted, function(e) {
                return parseInt(e, 10)
            }),
            r.datesDisabled = r.datesDisabled || [],
            e.isArray(r.datesDisabled) || (r.datesDisabled = [r.datesDisabled]),
            r.datesDisabled = e.map(r.datesDisabled, function(e) {
                return b.parseDate(e, o, r.language, r.assumeNearbyYear)
            });
            var s = String(r.orientation).toLowerCase().split(/\s+/g)
              , l = r.orientation.toLowerCase();
            if (s = e.grep(s, function(e) {
                return /^auto|left|right|top|bottom$/.test(e)
            }),
            r.orientation = {
                x: "auto",
                y: "auto"
            },
            l && "auto" !== l)
                if (1 === s.length)
                    switch (s[0]) {
                    case "top":
                    case "bottom":
                        r.orientation.y = s[0];
                        break;
                    case "left":
                    case "right":
                        r.orientation.x = s[0]
                    }
                else
                    l = e.grep(s, function(e) {
                        return /^left|right$/.test(e)
                    }),
                    r.orientation.x = l[0] || "auto",
                    l = e.grep(s, function(e) {
                        return /^top|bottom$/.test(e)
                    }),
                    r.orientation.y = l[0] || "auto";
            else
                ;if (r.defaultViewDate) {
                var c = r.defaultViewDate.year || (new Date).getFullYear()
                  , u = r.defaultViewDate.month || 0
                  , d = r.defaultViewDate.day || 1;
                r.defaultViewDate = n(c, u, d)
            } else
                r.defaultViewDate = i()
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(e) {
            for (var n, i, r, a = 0; a < e.length; a++)
                n = e[a][0],
                2 === e[a].length ? (i = t,
                r = e[a][1]) : 3 === e[a].length && (i = e[a][1],
                r = e[a][2]),
                n.on(r, i)
        },
        _unapplyEvents: function(e) {
            for (var n, i, r, a = 0; a < e.length; a++)
                n = e[a][0],
                2 === e[a].length ? (r = t,
                i = e[a][1]) : 3 === e[a].length && (r = e[a][1],
                i = e[a][2]),
                n.off(i, r)
        },
        _buildEvents: function() {
            var t = {
                keyup: e.proxy(function(t) {
                    -1 === e.inArray(t.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                }, this),
                keydown: e.proxy(this.keydown, this),
                paste: e.proxy(this.paste, this)
            };
            this.o.showOnFocus === !0 && (t.focus = e.proxy(this.show, this)),
            this._events = this.isInput ? [[this.element, t]] : this.component && this.hasInput ? [[this.inputField, t], [this.component, {
                click: e.proxy(this.show, this)
            }]] : [[this.element, {
                click: e.proxy(this.show, this),
                keydown: e.proxy(this.keydown, this)
            }]],
            this._events.push([this.element, "*", {
                blur: e.proxy(function(e) {
                    this._focused_from = e.target
                }, this)
            }], [this.element, {
                blur: e.proxy(function(e) {
                    this._focused_from = e.target
                }, this)
            }]),
            this.o.immediateUpdates && this._events.push([this.element, {
                "changeYear changeMonth": e.proxy(function(e) {
                    this.update(e.date)
                }, this)
            }]),
            this._secondaryEvents = [[this.picker, {
                click: e.proxy(this.click, this)
            }], [e(window), {
                resize: e.proxy(this.place, this)
            }], [e(document), {
                mousedown: e.proxy(function(e) {
                    this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.isInline || this.hide()
                }, this)
            }]]
        },
        _attachEvents: function() {
            this._detachEvents(),
            this._applyEvents(this._events)
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events)
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(),
            this._applyEvents(this._secondaryEvents)
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents)
        },
        _trigger: function(t, n) {
            var i = n || this.dates.get(-1)
              , r = this._utc_to_local(i);
            this.element.trigger({
                type: t,
                date: r,
                dates: e.map(this.dates, this._utc_to_local),
                format: e.proxy(function(e, t) {
                    0 === arguments.length ? (e = this.dates.length - 1,
                    t = this.o.format) : "string" == typeof e && (t = e,
                    e = this.dates.length - 1),
                    t = t || this.o.format;
                    var n = this.dates.get(e);
                    return b.formatDate(n, t, this.o.language)
                }, this)
            })
        },
        show: function() {
            return this.inputField.prop("disabled") || this.inputField.prop("readonly") && this.o.enableOnReadonly === !1 ? void 0 : (this.isInline || this.picker.appendTo(this.o.container),
            this.place(),
            this.picker.show(),
            this._attachSecondaryEvents(),
            this._trigger("show"),
            (window.navigator.msMaxTouchPoints || "ontouchstart"in document) && this.o.disableTouchKeyboard && e(this.element).blur(),
            this)
        },
        hide: function() {
            return this.isInline || !this.picker.is(":visible") ? this : (this.focusDate = null,
            this.picker.hide().detach(),
            this._detachSecondaryEvents(),
            this.viewMode = this.o.startView,
            this.showMode(),
            this.o.forceParse && this.inputField.val() && this.setValue(),
            this._trigger("hide"),
            this)
        },
        destroy: function() {
            return this.hide(),
            this._detachEvents(),
            this._detachSecondaryEvents(),
            this.picker.remove(),
            delete this.element.data().datepicker,
            this.isInput || delete this.element.data().date,
            this
        },
        paste: function(t) {
            var n;
            if (t.originalEvent.clipboardData && t.originalEvent.clipboardData.types && -1 !== e.inArray("text/plain", t.originalEvent.clipboardData.types))
                n = t.originalEvent.clipboardData.getData("text/plain");
            else {
                if (!window.clipboardData)
                    return;
                n = window.clipboardData.getData("Text")
            }
            this.setDate(n),
            this.update(),
            t.preventDefault()
        },
        _utc_to_local: function(e) {
            return e && new Date(e.getTime() + 6e4 * e.getTimezoneOffset())
        },
        _local_to_utc: function(e) {
            return e && new Date(e.getTime() - 6e4 * e.getTimezoneOffset())
        },
        _zero_time: function(e) {
            return e && new Date(e.getFullYear(),e.getMonth(),e.getDate())
        },
        _zero_utc_time: function(e) {
            return e && new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()))
        },
        getDates: function() {
            return e.map(this.dates, this._utc_to_local)
        },
        getUTCDates: function() {
            return e.map(this.dates, function(e) {
                return new Date(e)
            })
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate())
        },
        getUTCDate: function() {
            var e = this.dates.get(-1);
            return "undefined" != typeof e ? new Date(e) : null
        },
        clearDates: function() {
            this.inputField && this.inputField.val(""),
            this.update(),
            this._trigger("changeDate"),
            this.o.autoclose && this.hide()
        },
        setDates: function() {
            var t = e.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, t),
            this._trigger("changeDate"),
            this.setValue(),
            this
        },
        setUTCDates: function() {
            var t = e.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, e.map(t, this._utc_to_local)),
            this._trigger("changeDate"),
            this.setValue(),
            this
        },
        setDate: a("setDates"),
        setUTCDate: a("setUTCDates"),
        remove: a("destroy"),
        setValue: function() {
            var e = this.getFormattedDate();
            return this.inputField.val(e),
            this
        },
        getFormattedDate: function(n) {
            n === t && (n = this.o.format);
            var i = this.o.language;
            return e.map(this.dates, function(e) {
                return b.formatDate(e, n, i)
            }).join(this.o.multidateSeparator)
        },
        getStartDate: function() {
            return this.o.startDate
        },
        setStartDate: function(e) {
            return this._process_options({
                startDate: e
            }),
            this.update(),
            this.updateNavArrows(),
            this
        },
        getEndDate: function() {
            return this.o.endDate
        },
        setEndDate: function(e) {
            return this._process_options({
                endDate: e
            }),
            this.update(),
            this.updateNavArrows(),
            this
        },
        setDaysOfWeekDisabled: function(e) {
            return this._process_options({
                daysOfWeekDisabled: e
            }),
            this.update(),
            this.updateNavArrows(),
            this
        },
        setDaysOfWeekHighlighted: function(e) {
            return this._process_options({
                daysOfWeekHighlighted: e
            }),
            this.update(),
            this
        },
        setDatesDisabled: function(e) {
            this._process_options({
                datesDisabled: e
            }),
            this.update(),
            this.updateNavArrows()
        },
        place: function() {
            if (this.isInline)
                return this;
            var t = this.picker.outerWidth()
              , n = this.picker.outerHeight()
              , i = 10
              , r = e(this.o.container)
              , a = r.width()
              , o = "body" === this.o.container ? e(document).scrollTop() : r.scrollTop()
              , s = r.offset()
              , l = [];
            this.element.parents().each(function() {
                var t = e(this).css("z-index");
                "auto" !== t && 0 !== t && l.push(parseInt(t))
            });
            var c = Math.max.apply(Math, l) + this.o.zIndexOffset
              , u = this.component ? this.component.parent().offset() : this.element.offset()
              , d = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1)
              , p = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1)
              , h = u.left - s.left
              , f = u.top - s.top;
            "body" !== this.o.container && (f += o),
            this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),
            "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x),
            "right" === this.o.orientation.x && (h -= t - p)) : u.left < 0 ? (this.picker.addClass("datepicker-orient-left"),
            h -= u.left - i) : h + t > a ? (this.picker.addClass("datepicker-orient-right"),
            h += p - t) : this.picker.addClass("datepicker-orient-left");
            var g, m = this.o.orientation.y;
            if ("auto" === m && (g = -o + f - n,
            m = 0 > g ? "bottom" : "top"),
            this.picker.addClass("datepicker-orient-" + m),
            "top" === m ? f -= n + parseInt(this.picker.css("padding-top")) : f += d,
            this.o.rtl) {
                var b = a - (h + p);
                this.picker.css({
                    top: f,
                    right: b,
                    zIndex: c
                })
            } else
                this.picker.css({
                    top: f,
                    left: h,
                    zIndex: c
                });
            return this
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update)
                return this;
            var t = this.dates.copy()
              , n = []
              , i = !1;
            return arguments.length ? (e.each(arguments, e.proxy(function(e, t) {
                t instanceof Date && (t = this._local_to_utc(t)),
                n.push(t)
            }, this)),
            i = !0) : (n = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val(),
            n = n && this.o.multidate ? n.split(this.o.multidateSeparator) : [n],
            delete this.element.data().date),
            n = e.map(n, e.proxy(function(e) {
                return b.parseDate(e, this.o.format, this.o.language, this.o.assumeNearbyYear)
            }, this)),
            n = e.grep(n, e.proxy(function(e) {
                return !this.dateWithinRange(e) || !e
            }, this), !0),
            this.dates.replace(n),
            this.viewDate = this.dates.length ? new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? new Date(this.o.startDate) : this.viewDate > this.o.endDate ? new Date(this.o.endDate) : this.o.defaultViewDate,
            i ? this.setValue() : n.length && String(t) !== String(this.dates) && this._trigger("changeDate"),
            !this.dates.length && t.length && this._trigger("clearDate"),
            this.fill(),
            this.element.change(),
            this
        },
        fillDow: function() {
            var t = this.o.weekStart
              , n = "<tr>";
            for (this.o.calendarWeeks && (this.picker.find(".datepicker-days .datepicker-switch").attr("colspan", function(e, t) {
                return parseInt(t) + 1
            }),
            n += '<th class="cw">&#160;</th>'); t < this.o.weekStart + 7; )
                n += '<th class="dow',
                e.inArray(t, this.o.daysOfWeekDisabled) > -1 && (n += " disabled"),
                n += '">' + m[this.o.language].daysMin[t++ % 7] + "</th>";
            n += "</tr>",
            this.picker.find(".datepicker-days thead").append(n)
        },
        fillMonths: function() {
            for (var e = this._utc_to_local(this.viewDate), t = "", n = 0; 12 > n; ) {
                var i = e && e.getMonth() === n ? " focused" : "";
                t += '<span class="month' + i + '">' + m[this.o.language].monthsShort[n++] + "</span>"
            }
            this.picker.find(".datepicker-months td").html(t)
        },
        setRange: function(t) {
            t && t.length ? this.range = e.map(t, function(e) {
                return e.valueOf()
            }) : delete this.range,
            this.fill()
        },
        getClassNames: function(t) {
            var n = []
              , i = this.viewDate.getUTCFullYear()
              , r = this.viewDate.getUTCMonth()
              , a = new Date;
            return t.getUTCFullYear() < i || t.getUTCFullYear() === i && t.getUTCMonth() < r ? n.push("old") : (t.getUTCFullYear() > i || t.getUTCFullYear() === i && t.getUTCMonth() > r) && n.push("new"),
            this.focusDate && t.valueOf() === this.focusDate.valueOf() && n.push("focused"),
            this.o.todayHighlight && t.getUTCFullYear() === a.getFullYear() && t.getUTCMonth() === a.getMonth() && t.getUTCDate() === a.getDate() && n.push("today"),
            -1 !== this.dates.contains(t) && n.push("active"),
            this.dateWithinRange(t) || n.push("disabled"),
            this.dateIsDisabled(t) && n.push("disabled", "disabled-date"),
            -1 !== e.inArray(t.getUTCDay(), this.o.daysOfWeekHighlighted) && n.push("highlighted"),
            this.range && (t > this.range[0] && t < this.range[this.range.length - 1] && n.push("range"),
            -1 !== e.inArray(t.valueOf(), this.range) && n.push("selected"),
            t.valueOf() === this.range[0] && n.push("range-start"),
            t.valueOf() === this.range[this.range.length - 1] && n.push("range-end")),
            n
        },
        _fill_yearsView: function(n, i, r, a, o, s, l, c) {
            var u, d, p, h, f, g, m, b, v, y, _;
            for (u = "",
            d = this.picker.find(n),
            p = parseInt(o / r, 10) * r,
            f = parseInt(s / a, 10) * a,
            g = parseInt(l / a, 10) * a,
            h = e.map(this.dates, function(e) {
                return parseInt(e.getUTCFullYear() / a, 10) * a
            }),
            d.find(".datepicker-switch").text(p + "-" + (p + 9 * a)),
            m = p - a,
            b = -1; 11 > b; b += 1)
                v = [i],
                y = null,
                -1 === b ? v.push("old") : 10 === b && v.push("new"),
                -1 !== e.inArray(m, h) && v.push("active"),
                (f > m || m > g) && v.push("disabled"),
                m === this.viewDate.getFullYear() && v.push("focused"),
                c !== e.noop && (_ = c(new Date(m,0,1)),
                _ === t ? _ = {} : "boolean" == typeof _ ? _ = {
                    enabled: _
                } : "string" == typeof _ && (_ = {
                    classes: _
                }),
                _.enabled === !1 && v.push("disabled"),
                _.classes && (v = v.concat(_.classes.split(/\s+/))),
                _.tooltip && (y = _.tooltip)),
                u += '<span class="' + v.join(" ") + '"' + (y ? ' title="' + y + '"' : "") + ">" + m + "</span>",
                m += a;
            d.find("td").html(u)
        },
        fill: function() {
            var i, r, a = new Date(this.viewDate), o = a.getUTCFullYear(), s = a.getUTCMonth(), l = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0, c = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0, u = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCFullYear() : 1 / 0, d = 1 / 0 !== this.o.endDate ? this.o.endDate.getUTCMonth() : 1 / 0, p = m[this.o.language].today || m.en.today || "", h = m[this.o.language].clear || m.en.clear || "", f = m[this.o.language].titleFormat || m.en.titleFormat;
            if (!isNaN(o) && !isNaN(s)) {
                this.picker.find(".datepicker-days .datepicker-switch").text(b.formatDate(a, f, this.o.language)),
                this.picker.find("tfoot .today").text(p).toggle(this.o.todayBtn !== !1),
                this.picker.find("tfoot .clear").text(h).toggle(this.o.clearBtn !== !1),
                this.picker.find("thead .datepicker-title").text(this.o.title).toggle("" !== this.o.title),
                this.updateNavArrows(),
                this.fillMonths();
                var g = n(o, s - 1, 28)
                  , v = b.getDaysInMonth(g.getUTCFullYear(), g.getUTCMonth());
                g.setUTCDate(v),
                g.setUTCDate(v - (g.getUTCDay() - this.o.weekStart + 7) % 7);
                var y = new Date(g);
                g.getUTCFullYear() < 100 && y.setUTCFullYear(g.getUTCFullYear()),
                y.setUTCDate(y.getUTCDate() + 42),
                y = y.valueOf();
                for (var _, w = []; g.valueOf() < y; ) {
                    if (g.getUTCDay() === this.o.weekStart && (w.push("<tr>"),
                    this.o.calendarWeeks)) {
                        var x = new Date(+g + (this.o.weekStart - g.getUTCDay() - 7) % 7 * 864e5)
                          , k = new Date(Number(x) + (11 - x.getUTCDay()) % 7 * 864e5)
                          , C = new Date(Number(C = n(k.getUTCFullYear(), 0, 1)) + (11 - C.getUTCDay()) % 7 * 864e5)
                          , T = (k - C) / 864e5 / 7 + 1;
                        w.push('<td class="cw">' + T + "</td>")
                    }
                    _ = this.getClassNames(g),
                    _.push("day"),
                    this.o.beforeShowDay !== e.noop && (r = this.o.beforeShowDay(this._utc_to_local(g)),
                    r === t ? r = {} : "boolean" == typeof r ? r = {
                        enabled: r
                    } : "string" == typeof r && (r = {
                        classes: r
                    }),
                    r.enabled === !1 && _.push("disabled"),
                    r.classes && (_ = _.concat(r.classes.split(/\s+/))),
                    r.tooltip && (i = r.tooltip)),
                    _ = e.unique(_),
                    w.push('<td class="' + _.join(" ") + '"' + (i ? ' title="' + i + '"' : "") + (this.o.dateCells ? ' data-date="' + g.getTime().toString() + '"' : "") + ">" + g.getUTCDate() + "</td>"),
                    i = null,
                    g.getUTCDay() === this.o.weekEnd && w.push("</tr>"),
                    g.setUTCDate(g.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").empty().append(w.join(""));
                var N = m[this.o.language].monthsTitle || m.en.monthsTitle || "Months"
                  , E = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? N : o).end().find("span").removeClass("active");
                if (e.each(this.dates, function(e, t) {
                    t.getUTCFullYear() === o && E.eq(t.getUTCMonth()).addClass("active")
                }),
                (l > o || o > u) && E.addClass("disabled"),
                o === l && E.slice(0, c).addClass("disabled"),
                o === u && E.slice(d + 1).addClass("disabled"),
                this.o.beforeShowMonth !== e.noop) {
                    var D = this;
                    e.each(E, function(n, i) {
                        var r = new Date(o,n,1)
                          , a = D.o.beforeShowMonth(r);
                        a === t ? a = {} : "boolean" == typeof a ? a = {
                            enabled: a
                        } : "string" == typeof a && (a = {
                            classes: a
                        }),
                        a.enabled !== !1 || e(i).hasClass("disabled") || e(i).addClass("disabled"),
                        a.classes && e(i).addClass(a.classes),
                        a.tooltip && e(i).prop("title", a.tooltip)
                    })
                }
                this._fill_yearsView(".datepicker-years", "year", 10, 1, o, l, u, this.o.beforeShowYear),
                this._fill_yearsView(".datepicker-decades", "decade", 100, 10, o, l, u, this.o.beforeShowDecade),
                this._fill_yearsView(".datepicker-centuries", "century", 1e3, 100, o, l, u, this.o.beforeShowCentury)
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var e = new Date(this.viewDate)
                  , t = e.getUTCFullYear()
                  , n = e.getUTCMonth();
                switch (this.viewMode) {
                case 0:
                    this.o.startDate !== -1 / 0 && t <= this.o.startDate.getUTCFullYear() && n <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").addClass("disabled") : this.picker.find(".prev").removeClass("disabled"),
                    1 / 0 !== this.o.endDate && t >= this.o.endDate.getUTCFullYear() && n >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").addClass("disabled") : this.picker.find(".next").removeClass("disabled");
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                    this.o.startDate !== -1 / 0 && t <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".prev").addClass("disabled") : this.picker.find(".prev").removeClass("disabled"),
                    1 / 0 !== this.o.endDate && t >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".next").addClass("disabled") : this.picker.find(".next").removeClass("disabled")
                }
            }
        },
        click: function(t) {
            t.preventDefault(),
            t.stopPropagation();
            var r, a, o, s, l, c, u;
            r = e(t.target),
            r.hasClass("datepicker-switch") && this.showMode(1);
            var d = r.closest(".prev, .next");
            d.length > 0 && (a = b.modes[this.viewMode].navStep * (d.hasClass("prev") ? -1 : 1),
            0 === this.viewMode ? (this.viewDate = this.moveMonth(this.viewDate, a),
            this._trigger("changeMonth", this.viewDate)) : (this.viewDate = this.moveYear(this.viewDate, a),
            1 === this.viewMode && this._trigger("changeYear", this.viewDate)),
            this.fill()),
            r.hasClass("today") && !r.hasClass("day") && (this.showMode(-2),
            this._setDate(i(), "linked" === this.o.todayBtn ? null : "view")),
            r.hasClass("clear") && this.clearDates(),
            r.hasClass("disabled") || (r.hasClass("day") && (o = parseInt(r.text(), 10) || 1,
            s = this.viewDate.getUTCFullYear(),
            l = this.viewDate.getUTCMonth(),
            r.hasClass("old") && (0 === l ? (l = 11,
            s -= 1,
            c = !0,
            u = !0) : (l -= 1,
            c = !0)),
            r.hasClass("new") && (11 === l ? (l = 0,
            s += 1,
            c = !0,
            u = !0) : (l += 1,
            c = !0)),
            this._setDate(n(s, l, o)),
            u && this._trigger("changeYear", this.viewDate),
            c && this._trigger("changeMonth", this.viewDate)),
            r.hasClass("month") && (this.viewDate.setUTCDate(1),
            o = 1,
            l = r.parent().find("span").index(r),
            s = this.viewDate.getUTCFullYear(),
            this.viewDate.setUTCMonth(l),
            this._trigger("changeMonth", this.viewDate),
            1 === this.o.minViewMode ? (this._setDate(n(s, l, o)),
            this.showMode()) : this.showMode(-1),
            this.fill()),
            (r.hasClass("year") || r.hasClass("decade") || r.hasClass("century")) && (this.viewDate.setUTCDate(1),
            o = 1,
            l = 0,
            s = parseInt(r.text(), 10) || 0,
            this.viewDate.setUTCFullYear(s),
            r.hasClass("year") && (this._trigger("changeYear", this.viewDate),
            2 === this.o.minViewMode && this._setDate(n(s, l, o))),
            r.hasClass("decade") && (this._trigger("changeDecade", this.viewDate),
            3 === this.o.minViewMode && this._setDate(n(s, l, o))),
            r.hasClass("century") && (this._trigger("changeCentury", this.viewDate),
            4 === this.o.minViewMode && this._setDate(n(s, l, o))),
            this.showMode(-1),
            this.fill())),
            this.picker.is(":visible") && this._focused_from && e(this._focused_from).focus(),
            delete this._focused_from
        },
        _toggle_multidate: function(e) {
            var t = this.dates.contains(e);
            if (e || this.dates.clear(),
            -1 !== t ? (this.o.multidate === !0 || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(t) : this.o.multidate === !1 ? (this.dates.clear(),
            this.dates.push(e)) : this.dates.push(e),
            "number" == typeof this.o.multidate)
                for (; this.dates.length > this.o.multidate; )
                    this.dates.remove(0)
        },
        _setDate: function(e, t) {
            t && "date" !== t || this._toggle_multidate(e && new Date(e)),
            t && "view" !== t || (this.viewDate = e && new Date(e)),
            this.fill(),
            this.setValue(),
            t && "view" === t || this._trigger("changeDate"),
            this.inputField && this.inputField.change(),
            !this.o.autoclose || t && "date" !== t || this.hide()
        },
        moveDay: function(e, t) {
            var n = new Date(e);
            return n.setUTCDate(e.getUTCDate() + t),
            n
        },
        moveWeek: function(e, t) {
            return this.moveDay(e, 7 * t)
        },
        moveMonth: function(e, t) {
            if (!o(e))
                return this.o.defaultViewDate;
            if (!t)
                return e;
            var n, i, r = new Date(e.valueOf()), a = r.getUTCDate(), s = r.getUTCMonth(), l = Math.abs(t);
            if (t = t > 0 ? 1 : -1,
            1 === l)
                i = -1 === t ? function() {
                    return r.getUTCMonth() === s
                }
                : function() {
                    return r.getUTCMonth() !== n
                }
                ,
                n = s + t,
                r.setUTCMonth(n),
                (0 > n || n > 11) && (n = (n + 12) % 12);
            else {
                for (var c = 0; l > c; c++)
                    r = this.moveMonth(r, t);
                n = r.getUTCMonth(),
                r.setUTCDate(a),
                i = function() {
                    return n !== r.getUTCMonth()
                }
            }
            for (; i(); )
                r.setUTCDate(--a),
                r.setUTCMonth(n);
            return r
        },
        moveYear: function(e, t) {
            return this.moveMonth(e, 12 * t)
        },
        moveAvailableDate: function(e, t, n) {
            do {
                if (e = this[n](e, t),
                !this.dateWithinRange(e))
                    return !1;
                n = "moveDay"
            } while (this.dateIsDisabled(e));
            return e
        },
        weekOfDateIsDisabled: function(t) {
            return -1 !== e.inArray(t.getUTCDay(), this.o.daysOfWeekDisabled)
        },
        dateIsDisabled: function(t) {
            return this.weekOfDateIsDisabled(t) || e.grep(this.o.datesDisabled, function(e) {
                return r(t, e)
            }).length > 0
        },
        dateWithinRange: function(e) {
            return e >= this.o.startDate && e <= this.o.endDate
        },
        keydown: function(e) {
            if (!this.picker.is(":visible"))
                return void ((40 === e.keyCode || 27 === e.keyCode) && (this.show(),
                e.stopPropagation()));
            var t, n, i = !1, r = this.focusDate || this.viewDate;
            switch (e.keyCode) {
            case 27:
                this.focusDate ? (this.focusDate = null,
                this.viewDate = this.dates.get(-1) || this.viewDate,
                this.fill()) : this.hide(),
                e.preventDefault(),
                e.stopPropagation();
                break;
            case 37:
            case 38:
            case 39:
            case 40:
                if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length)
                    break;
                t = 37 === e.keyCode || 38 === e.keyCode ? -1 : 1,
                0 === this.viewMode ? e.ctrlKey ? (n = this.moveAvailableDate(r, t, "moveYear"),
                n && this._trigger("changeYear", this.viewDate)) : e.shiftKey ? (n = this.moveAvailableDate(r, t, "moveMonth"),
                n && this._trigger("changeMonth", this.viewDate)) : 37 === e.keyCode || 39 === e.keyCode ? n = this.moveAvailableDate(r, t, "moveDay") : this.weekOfDateIsDisabled(r) || (n = this.moveAvailableDate(r, t, "moveWeek")) : 1 === this.viewMode ? ((38 === e.keyCode || 40 === e.keyCode) && (t = 4 * t),
                n = this.moveAvailableDate(r, t, "moveMonth")) : 2 === this.viewMode && ((38 === e.keyCode || 40 === e.keyCode) && (t = 4 * t),
                n = this.moveAvailableDate(r, t, "moveYear")),
                n && (this.focusDate = this.viewDate = n,
                this.setValue(),
                this.fill(),
                e.preventDefault());
                break;
            case 13:
                if (!this.o.forceParse)
                    break;
                r = this.focusDate || this.dates.get(-1) || this.viewDate,
                this.o.keyboardNavigation && (this._toggle_multidate(r),
                i = !0),
                this.focusDate = null,
                this.viewDate = this.dates.get(-1) || this.viewDate,
                this.setValue(),
                this.fill(),
                this.picker.is(":visible") && (e.preventDefault(),
                e.stopPropagation(),
                this.o.autoclose && this.hide());
                break;
            case 9:
                this.focusDate = null,
                this.viewDate = this.dates.get(-1) || this.viewDate,
                this.fill(),
                this.hide()
            }
            i && (this._trigger(this.dates.length ? "changeDate" : "clearDate"),
            this.inputField && this.inputField.change())
        },
        showMode: function(e) {
            e && (this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + e))),
            this.picker.children("div").hide().filter(".datepicker-" + b.modes[this.viewMode].clsName).show(),
            this.updateNavArrows()
        }
    };
    var d = function(t, n) {
        e(t).data("datepicker", this),
        this.element = e(t),
        this.inputs = e.map(n.inputs, function(e) {
            return e.jquery ? e[0] : e
        }),
        delete n.inputs,
        h.call(e(this.inputs), n).on("changeDate", e.proxy(this.dateUpdated, this)),
        this.pickers = e.map(this.inputs, function(t) {
            return e(t).data("datepicker")
        }),
        this.updateDates()
    };
    d.prototype = {
        updateDates: function() {
            this.dates = e.map(this.pickers, function(e) {
                return e.getUTCDate()
            }),
            this.updateRanges()
        },
        updateRanges: function() {
            var t = e.map(this.dates, function(e) {
                return e.valueOf()
            });
            e.each(this.pickers, function(e, n) {
                n.setRange(t)
            })
        },
        dateUpdated: function(t) {
            if (!this.updating) {
                this.updating = !0;
                var n = e(t.target).data("datepicker");
                if ("undefined" != typeof n) {
                    var i = n.getUTCDate()
                      , r = e.inArray(t.target, this.inputs)
                      , a = r - 1
                      , o = r + 1
                      , s = this.inputs.length;
                    if (-1 !== r) {
                        if (e.each(this.pickers, function(e, t) {
                            t.getUTCDate() || t.setUTCDate(i)
                        }),
                        i < this.dates[a])
                            for (; a >= 0 && i < this.dates[a]; )
                                this.pickers[a--].setUTCDate(i);
                        else if (i > this.dates[o])
                            for (; s > o && i > this.dates[o]; )
                                this.pickers[o++].setUTCDate(i);
                        this.updateDates(),
                        delete this.updating
                    }
                }
            }
        },
        remove: function() {
            e.map(this.pickers, function(e) {
                e.remove()
            }),
            delete this.element.data().datepicker
        }
    };
    var p = e.fn.datepicker
      , h = function(n) {
        var i = Array.apply(null, arguments);
        i.shift();
        var r;
        if (this.each(function() {
            var t = e(this)
              , a = t.data("datepicker")
              , o = "object" == typeof n && n;
            if (!a) {
                var c = s(this, "date")
                  , p = e.extend({}, f, c, o)
                  , h = l(p.language)
                  , g = e.extend({}, f, h, c, o);
                t.hasClass("input-daterange") || g.inputs ? (e.extend(g, {
                    inputs: g.inputs || t.find("input").toArray()
                }),
                a = new d(this,g)) : a = new u(this,g),
                t.data("datepicker", a)
            }
            "string" == typeof n && "function" == typeof a[n] && (r = a[n].apply(a, i))
        }),
        r === t || r instanceof u || r instanceof d)
            return this;
        if (this.length > 1)
            throw new Error("Using only allowed for the collection of a single element (" + n + " function)");
        return r
    };
    e.fn.datepicker = h;
    var f = e.fn.datepicker.defaults = {
        assumeNearbyYear: !1,
        autoclose: !1,
        beforeShowDay: e.noop,
        beforeShowMonth: e.noop,
        beforeShowYear: e.noop,
        beforeShowDecade: e.noop,
        beforeShowCentury: e.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        toggleActive: !1,
        daysOfWeekDisabled: [],
        daysOfWeekHighlighted: [],
        datesDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        maxViewMode: 4,
        multidate: !1,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: !1,
        startDate: -1 / 0,
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        weekStart: 0,
        disableTouchKeyboard: !1,
        enableOnReadonly: !0,
        showOnFocus: !0,
        zIndexOffset: 10,
        container: "body",
        immediateUpdates: !1,
        dateCells: !1,
        title: "",
        templates: {
            leftArrow: "&laquo;",
            rightArrow: "&raquo;"
        }
    }
      , g = e.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    e.fn.datepicker.Constructor = u;
    var m = e.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear",
            titleFormat: "MM yyyy"
        }
    }
      , b = {
        modes: [{
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        }, {
            clsName: "decades",
            navFnc: "FullDecade",
            navStep: 100
        }, {
            clsName: "centuries",
            navFnc: "FullCentury",
            navStep: 1e3
        }],
        isLeapYear: function(e) {
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
        },
        getDaysInMonth: function(e, t) {
            return [31, b.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
        parseFormat: function(e) {
            if ("function" == typeof e.toValue && "function" == typeof e.toDisplay)
                return e;
            var t = e.replace(this.validParts, "\x00").split("\x00")
              , n = e.match(this.validParts);
            if (!t || !t.length || !n || 0 === n.length)
                throw new Error("Invalid date format.");
            return {
                separators: t,
                parts: n
            }
        },
        parseDate: function(r, a, o, s) {
            function l(e, t) {
                return t === !0 && (t = 10),
                100 > e && (e += 2e3,
                e > (new Date).getFullYear() + t && (e -= 100)),
                e
            }
            function c() {
                var e = this.slice(0, v[h].length)
                  , t = v[h].slice(0, e.length);
                return e.toLowerCase() === t.toLowerCase()
            }
            if (!r)
                return t;
            if (r instanceof Date)
                return r;
            if ("string" == typeof a && (a = b.parseFormat(a)),
            a.toValue)
                return a.toValue(r, a, o);
            var d, p, h, f, g = /([\-+]\d+)([dmwy])/, v = r.match(/([\-+]\d+)([dmwy])/g), y = {
                d: "moveDay",
                m: "moveMonth",
                w: "moveWeek",
                y: "moveYear"
            }, _ = {
                yesterday: "-1d",
                today: "+0d",
                tomorrow: "+1d"
            };
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(r)) {
                for (r = new Date,
                h = 0; h < v.length; h++)
                    d = g.exec(v[h]),
                    p = parseInt(d[1]),
                    f = y[d[2]],
                    r = u.prototype[f](r, p);
                return n(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate())
            }
            if ("undefined" != typeof _[r] && (r = _[r],
            v = r.match(/([\-+]\d+)([dmwy])/g),
            /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(r))) {
                for (r = new Date,
                h = 0; h < v.length; h++)
                    d = g.exec(v[h]),
                    p = parseInt(d[1]),
                    f = y[d[2]],
                    r = u.prototype[f](r, p);
                return n(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate())
            }
            v = r && r.match(this.nonpunctuation) || [],
            r = new Date;
            var w, x, k = {}, C = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], T = {
                yyyy: function(e, t) {
                    return e.setUTCFullYear(s ? l(t, s) : t)
                },
                yy: function(e, t) {
                    return e.setUTCFullYear(s ? l(t, s) : t)
                },
                m: function(e, t) {
                    if (isNaN(e))
                        return e;
                    for (t -= 1; 0 > t; )
                        t += 12;
                    for (t %= 12,
                    e.setUTCMonth(t); e.getUTCMonth() !== t; )
                        e.setUTCDate(e.getUTCDate() - 1);
                    return e
                },
                d: function(e, t) {
                    return e.setUTCDate(t)
                }
            };
            T.M = T.MM = T.mm = T.m,
            T.dd = T.d,
            r = i();
            var N = a.parts.slice();
            if (v.length !== N.length && (N = e(N).filter(function(t, n) {
                return -1 !== e.inArray(n, C)
            }).toArray()),
            v.length === N.length) {
                var E;
                for (h = 0,
                E = N.length; E > h; h++) {
                    if (w = parseInt(v[h], 10),
                    d = N[h],
                    isNaN(w))
                        switch (d) {
                        case "MM":
                            x = e(m[o].months).filter(c),
                            w = e.inArray(x[0], m[o].months) + 1;
                            break;
                        case "M":
                            x = e(m[o].monthsShort).filter(c),
                            w = e.inArray(x[0], m[o].monthsShort) + 1
                        }
                    k[d] = w
                }
                var D, $;
                for (h = 0; h < C.length; h++)
                    $ = C[h],
                    $ in k && !isNaN(k[$]) && (D = new Date(r),
                    T[$](D, k[$]),
                    isNaN(D) || (r = D))
            }
            return r
        },
        formatDate: function(t, n, i) {
            if (!t)
                return "";
            if ("string" == typeof n && (n = b.parseFormat(n)),
            n.toDisplay)
                return n.toDisplay(t, n, i);
            var r = {
                d: t.getUTCDate(),
                D: m[i].daysShort[t.getUTCDay()],
                DD: m[i].days[t.getUTCDay()],
                m: t.getUTCMonth() + 1,
                M: m[i].monthsShort[t.getUTCMonth()],
                MM: m[i].months[t.getUTCMonth()],
                yy: t.getUTCFullYear().toString().substring(2),
                yyyy: t.getUTCFullYear()
            };
            r.dd = (r.d < 10 ? "0" : "") + r.d,
            r.mm = (r.m < 10 ? "0" : "") + r.m,
            t = [];
            for (var a = e.extend([], n.separators), o = 0, s = n.parts.length; s >= o; o++)
                a.length && t.push(a.shift()),
                t.push(r[n.parts[o]]);
            return t.join("")
        },
        headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    b.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + b.headTemplate + "<tbody></tbody>" + b.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + b.headTemplate + b.contTemplate + b.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + b.headTemplate + b.contTemplate + b.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + b.headTemplate + b.contTemplate + b.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + b.headTemplate + b.contTemplate + b.footTemplate + "</table></div></div>",
    e.fn.datepicker.DPGlobal = b,
    e.fn.datepicker.noConflict = function() {
        return e.fn.datepicker = p,
        this
    }
    ,
    e.fn.datepicker.version = "1.7.0-dev",
    e(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(t) {
        var n = e(this);
        n.data("datepicker") || (t.preventDefault(),
        h.call(n, "show"))
    }),
    e(function() {
        h.call(e('[data-provide="datepicker-inline"]'))
    })
}),
function() {
    $(function() {
        var e, t;
        return t = "/img/emoji",
        emojify.setConfig({
            img_dir: t
        }),
        e = ["couple_with_heart", "worried", "european_post_office", "shipit", "arrow_up", "palm_tree", "yen", "name_badge", "eyes", "tanabata_tree", "truck", "steam_locomotive", "chicken", "signal_strength", "tractor", "registered", "wrench", "notebook_with_decorative_cover", "koko", "tshirt", "bookmark_tabs", "traffic_light", "bird", "tangerine", "grey_exclamation", "mount_fuji", "bento", "clock730", "feelsgood", "mailbox_closed", "telephone", "grapes", "ghost", "stuck_out_tongue_winking_eye", "+1", "page_facing_up", "mag_right", "coffee", "game_die", "flashlight", "octocat", "japanese_ogre", "joy_cat", "orange_book", "capricorn", "lipstick", "lemon", "loudspeaker", "couplekiss", "closed_umbrella", "fire_engine", "balloon", "zap", "surfer", "rage3", "minibus", "ship", "walking", "cupid", "ophiuchus", "factory", "metro", "bikini", "fearful", "cn", "pencil2", "point_right", "rice_cracker", "finnadie", "fried_shrimp", "izakaya_lantern", "wc", "rage2", "eggplant", "dvd", "telescope", "heavy_multiplication_x", "boar", "diamonds", "crescent_moon", "seedling", "recycle", "anguished", "vhs", "ferris_wheel", "moyai", "circus_tent", "rose", "cocktail", "beetle", "helicopter", "ideograph_advantage", "grin", "fast_forward", "potable_water", "tada", "bee", "baby", "couple", "skull", "on", "four_leaf_clover", "partly_sunny", "currency_exchange", "barber", "heart_eyes", "milky_way", "parking", "railway_car", "green_apple", "ribbon", "tv", "tiger2", "customs", "basketball", "arrow_upper_right", "pig2", "cloud", "rooster", "school", "two", "heart", "alien", "space_invader", "sunglasses", "sunrise", "santa", "cry", "gift", "rice_ball", "womans_clothes", "sandal", "japan", "mute", "baseball", "star", "flower_playing_cards", "mobile_phone_off", "b", "musical_note", "stuck_out_tongue_closed_eyes", "foggy", "post_office", "clock830", "unlock", "dancer", "notebook", "rat", "cow", "arrows_clockwise", "punch", "princess", "no_good", "horse", "aquarius", "disappointed", "calendar", "hotsprings", "arrow_double_up", "sweet_potato", "speaker", "free", "sailboat", "musical_score", "rage", "crossed_flags", "8ball", "sweat", "zero", "last_quarter_moon_with_face", "hear_no_evil", "interrobang", "e-mail", "nut_and_bolt", "pig", "rabbit2", "moneybag", "mailbox_with_no_mail", "monkey", "book", "womens", "mailbox_with_mail", "hotel", "gemini", "dromedary_camel", "pouting_cat", "monorail", "us", "battery", "eyeglasses", "m", "guitar", "microphone", "wink", "ab", "tokyo_tower", "hearts", "dollar", "jp", "inbox_tray", "egg", "pear", "tent", "eight", "hankey", "satisfied", "accept", "kimono", "squirrel", "confused", "blossom", "gun", "bear", "keycap_ten", "eight_pointed_black_star", "arrow_up_small", "headphones", "boom", "do_not_litter", "money_with_wings", "man", "roller_coaster", "octopus", "womans_hat", "candy", "earth_americas", "last_quarter_moon", "ambulance", "doughnut", "plus1", "snail", "triangular_flag_on_post", "leftwards_arrow_with_hook", "ocean", "rice_scene", "suspect", "cherry_blossom", "point_down", "cake", "postal_horn", "postbox", "joy", "computer", "spades", "four", "slot_machine", "scorpius", "rage1", "cl", "love_hotel", "white_flower", "twisted_rightwards_arrows", "arrow_up_down", "de", "sushi", "massage", "mountain_bicyclist", "heavy_division_sign", "clock330", "negative_squared_cross_mark", "u6709", "ear", "police_car", "trollface", "crown", "high_heel", "tomato", "abc", "movie_camera", "spaghetti", "checkered_flag", "girl", "dog", "waning_gibbous_moon", "scissors", "fallen_leaf", "sun_with_face", "monkey_face", "tired_face", "pound", "oncoming_taxi", "dragon", "ox", "package", "sleeping", "jeans", "ear_of_rice", "heartpulse", "white_check_mark", "pisces", "tiger", "unamused", "new_moon", "alarm_clock", "hibiscus", "beer", "1234", "bullettrain_side", "gem", "cat2", "mountain_railway", "u7981", "bomb", "raised_hands", "white_medium_small_square", "scroll", "fries", "sa", "two_hearts", "chart_with_upwards_trend", "smile_cat", "small_red_triangle", "heart_decoration", "busts_in_silhouette", "relieved", "honey_pot", "chocolate_bar", "performing_arts", "cold_sweat", "symbols", "wedding", "nail_care", "hand", "ticket", "envelope", "pineapple", "open_hands", "ramen", "mans_shoe", "high_brightness", "vs", "snowflake", "bow", "black_square_button", "sweat_smile", "snowman", "honeybee", "six", "hash", "fish_cake", "virgo", "incoming_envelope", "person_with_pouting_face", "crystal_ball", "u6e80", "clock11", "icecream", "u7121", "paperclip", "clock230", "goberserk", "u5272", "ballot_box_with_check", "saxophone", "cat", "shirt", "shoe", "hamburger", "point_left", "whale2", "neutral_face", "tennis", "clock6", "white_medium_square", "tongue", "fax", "anger", "wavy_dash", "pushpin", "kissing_cat", "persevere", "wind_chime", "arrow_down", "dizzy_face", "dress", "smirk_cat", "rice", "smirk", "cop", "paw_prints", "trolleybus", "bread", "green_heart", "articulated_lorry", "tulip", "ledger", "suspension_railway", "angry", "ng", "european_castle", "rewind", "rowboat", "memo", "id", "sunny", "a", "congratulations", "rotating_light", "convenience_store", "uk", "deciduous_tree", "stars", "baby_bottle", "kissing_smiling_eyes", "thumbsup", "large_blue_diamond", "bike", "black_medium_small_square", "airplane", "clock2", "hourglass_flowing_sand", "clock430", "dango", "shit", "carousel_horse", "gift_heart", "smiling_imp", "peach", "zzz", "radio_button", "lips", "speech_balloon", "woman", "school_satchel", "radio", "office", "arrow_right", "sparkle", "closed_lock_with_key", "black_small_square", "revolving_hearts", "syringe", "o", "bathtub", "horse_racing", "heavy_plus_sign", "bulb", "open_file_folder", "speak_no_evil", "briefcase", "small_blue_diamond", "flushed", "mailbox", "sagittarius", "bangbang", "blowfish", "astonished", "poop", "calling", "busstop", "seven", "cool", "no_smoking", "aries", "white_small_square", "point_up_2", "construction", "stew", "toilet", "fishing_pole_and_fish", "blush", "corn", "wolf", "kissing", "arrow_heading_down", "back", "yum", "chestnut", "restroom", "oncoming_automobile", "ram", "black_joker", "top", "frowning", "bouquet", "kiss", "clock930", "tea", "cookie", "abcd", "love_letter", "minidisc", "chart_with_downwards_trend", "large_orange_diamond", "bridge_at_night", "clock1", "nose", "violin", "o2", "city_sunset", "libra", "runner", "waxing_gibbous_moon", "sparkler", "end", "confetti_ball", "point_up", "underage", "running", "innocent", "heartbeat", "koala", "sparkles", "u7533", "bank", "arrow_forward", "clock130", "closed_book", "email", "bowling", "books", "see_no_evil", "dragon_face", "sunflower", "raised_hand", "microscope", "clap", "pensive", "cyclone", "kissing_heart", "birthday", "aerial_tramway", "droplet", "whale", "art", "penguin", "x", "sos", "yellow_heart", "arrow_upper_left", "herb", "link", "arrows_counterclockwise", "metal", "diamond_shape_with_a_dot_inside", "heavy_check_mark", "video_game", "five", "cow2", "bamboo", "date", "clubs", "fireworks", "wave", "raising_hand", "tm", "mask", "part_alternation_mark", "leopard", "lock", "hocho", "sleepy", "new_moon_with_face", "dancers", "oncoming_police_car", "construction_worker", "japanese_goblin", "mouse", "grey_question", "camel", "arrow_lower_right", "left_right_arrow", "bowtie", "fire", "clock1030", "house_with_garden", "pill", "sparkling_heart", "cd", "u5408", "earth_asia", "scream", "copyright", "thought_balloon", "one", "first_quarter_moon", "kissing_face", "arrow_lower_left", "fork_and_knife", "open_mouth", "dizzy", "warning", "vibration_mode", "new", "smile", "passport_control", "kr", "heart_eyes_cat", "japanese_castle", "it", "clock4", "custard", "sheep", "white_large_square", "rabbit", "white_circle", "car", "tropical_fish", "fr", "baggage_claim", "leaves", "video_camera", "handbag", "iphone", "crocodile", "trumpet", "put_litter_in_its_place", "no_bell", "racehorse", "curly_loop", "mortar_board", "boat", "dolphin", "globe_with_meridians", "ok_hand", "collision", "bookmark", "non-potable_water", "dart", "weary", "pray", "bell", "euro", "hurtrealbad", "man_with_gua_pi_mao", "snowboarder", "repeat_one", "black_nib", "triangular_ruler", "question", "waxing_crescent_moon", "shell", "sweat_drops", "clock8", "laughing", "hourglass", "thumbsdown", "nine", "wheelchair", "cancer", "cinema", "mega", "department_store", "jack_o_lantern", "rainbow", "grinning", "beers", "large_blue_circle", "musical_keyboard", "kissing_closed_eyes", "melon", "full_moon_with_face", "tram", "fist", "red_car", "no_mobile_phones", "floppy_disk", "tophat", "dolls", "mahjong", "u6307", "key", "hatched_chick", "mens", "cherries", "eight_spoked_asterisk", "person_frowning", "football", "black_circle", "elephant", "snake", "running_shirt_with_sash", "mag", "information_source", "ru", "no_bicycles", "seat", "white_square_button", "triumph", "taxi", "shower", "banana", "man_with_turban", "telephone_receiver", "feet", "ski", "clock9", "fuelpump", "oncoming_bus", "arrow_double_down", "panda_face", "broken_heart", "boot", "baby_symbol", "fish", "older_man", "fountain", "newspaper", "speedboat", "straight_ruler", "wine_glass", "star2", "turtle", "mountain_cableway", "sound", "watermelon", "arrow_backward", "phone", "small_red_triangle_down", "waning_crescent_moon", "station", "pizza", "clock3", "no_pedestrians", "arrow_heading_up", "clipboard", "smoking", "strawberry", "family", "clock5", "blue_heart", "no_entry_sign", "taurus", "pouch", "hatching_chick", "beginner", "older_woman", "scream_cat", "necktie", "crying_cat_face", "relaxed", "pager", "umbrella", "flags", "chart", "apple", "clock630", "muscle", "leo", "purse", "watch", "mushroom", "round_pushpin", "bicyclist", "meat_on_bone", "ice_cream", "blue_car", "two_men_holding_hands", "bug", "repeat", "light_rail", "left_luggage", "clock1130", "capital_abcd", "smiley_cat", "three", "neckbeard", "house", "trident", "rage4", "curry", "up", "hushed", "atm", "electric_plug", "poultry_leg", "heavy_minus_sign", "loop", "sunrise_over_mountains", "tropical_drink", "v", "secret", "information_desk_person", "file_folder", "satellite", "donut", "hammer", "hamster", "train", "oden", "hospital", "clapper", "trophy", "boy", "city_sunrise", "christmas_tree", "maple_leaf", "bust_in_silhouette", "ring", "u6708", "outbox_tray", "person_with_blond_hair", "blue_book", "dash", "soccer", "ant", "baby_chick", "credit_card", "gb", "statue_of_liberty", "bride_with_veil", "angel", "children_crossing", "purple_heart", "first_quarter_moon_with_face", "lollipop", "arrow_down_small", "imp", "heavy_exclamation_mark", "earth_africa", "100", "swimmer", "black_square", "arrow_left", "pig_nose", "clock10", "golf", "evergreen_tree", "no_mouth", "clock530", "mouse2", "no_entry", "soon", "ok_woman", "fu", "godmode", "u55b6", "dog2", "rocket", "black_medium_square", "smiley", "camera", "clock1230", "sake", "clock12", "two_women_holding_hands", "expressionless", "church", "shaved_ice", "stuck_out_tongue", "bath", "-1", "es", "bar_chart", "poodle", "frog", "arrow_right_hook", "full_moon", "small_orange_diamond", "heavy_dollar_sign", "exclamation", "confounded", "goat", "low_brightness", "train2", "volcano", "six_pointed_star", "door", "ok", "vertical_traffic_light", "bullettrain_front", "disappointed_relieved", "clock7", "bus", "notes", "facepunch", "pencil", "page_with_curl", "card_index", "haircut", "guardsman", "anchor", "u7a7a", "cactus", "lock_with_ink_pen", "grimacing", "green_book", "red_circle", "rugby_football", "sob", "water_buffalo"],
        $(".markdown-content textarea").textcomplete([{
            match: /\B:([\-+\w]*)$/,
            search: function(t, n) {
                n($.map(e, function(e) {
                    return -1 !== e.indexOf(t) ? e : null
                }))
            },
            template: function(e) {
                return "<img class='emoji-suggest' src='" + t + e + ".png'/>  " + e
            },
            replace: function(e) {
                return ":" + e + ": "
            },
            index: 1,
            maxCount: 8
        }])
    })
}
.call(this),
function() {
    $(function() {
        return $("header ul .dropdown-toggle").dropdownHover({
            delay: 100,
            hoverDelay: 100
        })
    })
}
.call(this),
function() {
    $(function() {
        return $("#new_inquiry").on("ajax:error", function() {
            return alert("\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\u304a\u624b\u6570\u3067\u3059\u304c\u3001\u3057\u3070\u3089\u304f\u5f85\u3064\u304b\u76f4\u63a5\u30e1\u30fc\u30eb\u306b\u3066\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044"),
            $("#inquiry-error").hide(),
            $("#inquiry_body").val(""),
            $("#new_inquiry").modal("hide")
        })
    })
}
.call(this),
function() {
    $(function() {
        var e;
        return marked.setOptions({
            gfm: !0,
            sanitize: !0,
            breaks: !0,
            highlight: function(e) {
                return hljs.highlightAuto(e).value
            }
        }),
        emojify.setConfig({
            img_dir: "/img/emoji"
        }),
        e = new RickDOM,
        $(document).on("click", ".tab-md-preview", function() {
            var t, n, i;
            return t = $(this).closest(".markdown-editor").find(".markdown-content"),
            i = t.find("textarea").val(),
            n = t.find(".content-md-preview"),
            n.html(e.build(marked(i))),
            emojify.run(t[0])
        }),
        $(".markdown-view").each(function(t, n) {
            var i, r;
            return r = $(n).find("textarea").val(),
            i = $(n).find(".markdown-body"),
            i.html(e.build(marked(r))),
            emojify.run(n)
        }),
        hljs.initHighlightingOnLoad(),
        $("a[href^='http']:not([href*='" + location.hostname + "'])").attr("target", "_blank")
    })
}
.call(this),
function() {
    $(function() {
        return $(".monthly_report_comment_edit").click(function() {
            var e, t;
            return e = $(this).find("[name=comment_id]").val(),
            t = $(this).closest(".panel"),
            $.ajax({
                url: "/monthly_report_comments/" + e + "/edit",
                dataType: "html",
                success: function(e) {
                    return t.replaceWith(e)
                }
            })
        })
    })
}
.call(this),
RickDOM.prototype.build = function(e) {
    var t, n, i, r, a = [], o = this, s = function(e) {
        var t, n, i, r, a, l, c, u, d;
        switch (e.nodeType) {
        case 1:
            if (i = o.compiledAllowings[e.tagName.toLowerCase()],
            void 0 === i)
                return void 0;
            for (n = document.createElement(e.tagName),
            t = 0; t < e.attributes.length; t++)
                if (l = e.attributes[t].name,
                a = i[l],
                "style" === l && "object" == typeof a)
                    for (c in a)
                        u = a[c],
                        d = c.replace(/-([a-z])/g, function(e, t) {
                            return t.toUpperCase()
                        }),
                        u instanceof RegExp ? u.test(e.style[d]) && (n.style[d] = e.style[d]) : "string" == typeof u && (n.style[d] = e.style[d]);
                else
                    a instanceof RegExp ? a.test(e.attributes[t].value) && n.setAttribute(l, e.attributes[t].value) : "string" == typeof a && n.setAttribute(l, e.attributes[t].value);
            for (t = 0; t < e.childNodes.length; t++)
                r = s(e.childNodes[t]),
                void 0 !== r && n.appendChild(r);
            return n;
        case 3:
            return document.createTextNode(e.textContent);
        default:
            return void 0
        }
    };
    if ("undefined" != typeof DOMParser)
        try {
            var l = new DOMParser;
            for (t = l.parseFromString(e, "text/html"),
            n = t.body,
            i = 0; i < n.childNodes.length; i++)
                r = s(n.childNodes[i]),
                void 0 !== r && a.push(document.importNode(r, !0));
            return a
        } catch (c) {}
    if (document.implementation && document.implementation.createHTMLDocument) {
        for (n = document.implementation.createHTMLDocument("").body,
        n.innerHTML = e,
        i = 0; i < n.childNodes.length; i++)
            r = s(n.childNodes[i]),
            void 0 !== r && a.push(document.importNode(r, !0));
        return a
    }
    throw new Error("not suppoted")
}
,
RickDOM.prototype.allowings = {
    article: {},
    section: {},
    nav: {},
    aside: {},
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    "h6 ": {},
    header: {},
    footer: {},
    address: {},
    p: {},
    hr: {},
    pre: {},
    blockquote: {
        cite: {
            pattern: "^https?:\\/\\/"
        }
    },
    ol: {
        reversed: {
            pattern: "^(:?true|false)$",
            flag: "i"
        },
        start: {
            pattern: "^-?[\\d]+$"
        },
        type: ""
    },
    ul: {},
    li: {
        value: {
            pattern: "^-?[\\d]+$"
        }
    },
    dl: {},
    dt: {},
    dd: {},
    figure: {},
    figcaption: {},
    div: {},
    main: {},
    a: {
        href: {
            pattern: "^https?:\\/\\/"
        },
        target: {
            pattern: "^(:?_blank|_self)$"
        }
    },
    em: {},
    strong: {},
    small: {},
    s: {},
    cite: {},
    q: {
        cite: {
            pattern: "^https?:\\/\\/"
        }
    },
    dfn: {},
    abbr: {},
    data: {
        value: ""
    },
    time: {
        datetime: ""
    },
    code: {},
    "var": {},
    samp: {},
    kbd: {},
    sub: {},
    sup: {},
    i: {},
    b: {},
    u: {},
    mark: {},
    ruby: {},
    rb: {},
    rt: {},
    rtc: {},
    rp: {},
    bdi: {},
    bdo: {},
    span: {},
    br: {},
    wbr: {},
    ins: {
        cite: {
            pattern: "^https?:\\/\\/"
        },
        datetime: ""
    },
    del: {
        cite: {
            pattern: "^https?:\\/\\/"
        },
        datetime: ""
    },
    img: {
        alt: "",
        src: "",
        width: "",
        height: ""
    },
    table: {
        border: ""
    },
    caption: {},
    colgroup: {
        span: ""
    },
    col: {
        span: ""
    },
    tbody: {},
    thead: {},
    tfoot: {},
    tr: {},
    td: {
        colspan: {
            pattern: "^[\\d]+$"
        },
        rowspan: {
            pattern: "^[\\d]+$"
        },
        headers: ""
    },
    th: {
        colspan: {
            pattern: "^[\\d]+$"
        },
        rowspan: {
            pattern: "^[\\d]+$"
        },
        headers: "",
        state: {
            pattern: "^(:?row|col|rowgroup|colgroup|auto)$",
            abbr: ""
        }
    },
    marquee: {
        height: "",
        width: "",
        hspace: "",
        vspace: "",
        behavior: "",
        loop: "",
        direction: "",
        scrolldelay: "",
        scrollamount: "",
        bgcolor: ""
    }
},
function() {
    var e = {
        accesskey: "",
        "class": "",
        contenteditable: {
            pattern: "^(:?true|false|inherit)$",
            flag: "i"
        },
        lang: "",
        spellcheck: "",
        title: "",
        style: {
            opacity: {
                pattern: "^\\s*[\\d\\.]*\\s*$"
            },
            color: {
                pattern: "^\\s*(?:#(?:[\\da-f]{3}|[\\da-f]{6})|rgb\\(\\s*(:?[\\d]+,?\\s*){3}\\))\\s*$"
            },
            "font-family": {
                pattern: "^\\s*(?:[\\w\\-]+|[\"'][\\w\\s\\-]+[\"'])\\s*$"
            },
            "font-size": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|xx-small|x-small|small|medium|large|x-large|xx-large|larger|smaller)\\s*$"
            },
            "font-weight": {
                pattern: "^\\s*(?:normal|bold|lighter|bolder|100|200|300|400|500|600|700|800|900)\\s*$"
            },
            "font-style": {
                pattern: "\\s*(?:normal|italic|oblique)\\s*$"
            },
            "background-color": {
                pattern: "^\\s*(?:#(?:[\\da-f]{3}|[\\da-f]{6})|rgb\\(\\s*(:?[\\d]+,?\\s*){3}\\))\\s*$",
                flag: "i"
            },
            "word-break": {
                pattern: "^\\s*(?:normal|keep-all|loose|break-strict|break-all)\\s*$"
            },
            "text-wrap": {
                pattern: "^\\s*(?:normal|none|unrestricted|suppress)\\s*$"
            },
            "word-wrap": {
                pattern: "^\\s*(?:normal|brek-word)\\s*$"
            },
            "text-align": {
                pattern: "^\\s*(?:left|right|center|justify|initial|inherit)\\s*$"
            },
            "vertical-align": {
                pattern: "^\\s*(?:(?:(?:[\\-\\d\\.]+(?:em|ex|px|%))|baseline|top|middle|bottom|text-top|text-bottom|super|sub)s*){1,4}\\s*$"
            },
            "text-decoration-line": {
                pattern: "^\\s*(?:none|underline|overline|line-through)\\s*$"
            },
            "text-decoration-color": {
                pattern: "^\\s*(?:#(?:[\\da-f]{3}|[\\da-f]{6})|rgb\\(\\s*(:?[\\d]+,?\\s*){3}\\))\\s*$"
            },
            "text-decoration-style": {
                pattern: "^\\s*(?:solid|double|dotted|dashed|wavy)\\s*$"
            },
            margin: {
                pattern: "^\\s*(?:(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)s*){1,4}\\s*$"
            },
            "margin-bottom": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)\\s*$"
            },
            "margin-left": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)\\s*$"
            },
            "margin-top": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)\\s*$"
            },
            "margin-right": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)\\s*$"
            },
            padding: {
                pattern: "^\\s*(?:(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)s*){1,4}\\s*$"
            },
            "padding-bottom": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)\\s*$"
            },
            "padding-left": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)\\s*$"
            },
            "padding-top": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)\\s*$"
            },
            "padding-right": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)\\s*$"
            },
            height: {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)\\s*$"
            },
            width: {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|auto)\\s*$"
            },
            display: {
                pattern: "^\\s*(?:inline|block|inline-block|list-item|run-in|compact|none)\\s*$"
            },
            "border-width": {
                pattern: "^\\s*(?:(?:(?:[\\d\\.]+(?:em|ex|px|%))|thin|medium|thick)s*){1,4}\\s*$"
            },
            "border-top-width": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|thin|medium|thick)\\s*$"
            },
            "border-left-width": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|thin|medium|thick)\\s*$"
            },
            "border-bottom-width": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|thin|medium|thick)\\s*$"
            },
            "border-right-width": {
                pattern: "^\\s*(?:(?:[\\d\\.]+(?:em|ex|px|%))|thin|medium|thick)\\s*$"
            },
            "border-color": {
                pattern: "^\\s*(?:(?:#(?:[\\da-f]{3}|[\\da-f]{6})|rgb\\(\\s*(:?[\\d]+,?\\s*){3}\\))\\s*){1,4}\\s*$"
            },
            "border-top-color": {
                pattern: "^\\s*(?:#(?:[\\da-f]{3}|[\\da-f]{6})|rgb\\(\\s*(:?[\\d]+,?\\s*){3}\\))\\s*$"
            },
            "border-left-color": {
                pattern: "^\\s*(?:#(?:[\\da-f]{3}|[\\da-f]{6})|rgb\\(\\s*(:?[\\d]+,?\\s*){3}\\))\\s*$"
            },
            "border-bottom-color": {
                pattern: "^\\s*(?:#(?:[\\da-f]{3}|[\\da-f]{6})|rgb\\(\\s*(:?[\\d]+,?\\s*){3}\\))\\s*$"
            },
            "border-right-color": {
                pattern: "^\\s*(?:#(?:[\\da-f]{3}|[\\da-f]{6})|rgb\\(\\s*(:?[\\d]+,?\\s*){3}\\))\\s*$"
            },
            "border-style": {
                pattern: "^\\s*(?:(?:none|hidden|solid|double|groove|ridge|inset|outset|dotted|dashed)\\s*){1,4}\\s*$"
            },
            "border-top-style": {
                pattern: "^\\s*(?:none|hidden|solid|double|groove|ridge|inset|outset|dotted|dashed)\\s*$"
            },
            "border-left-style": {
                pattern: "^\\s*(?:none|hidden|solid|double|groove|ridge|inset|outset|dotted|dashed)\\s*$"
            },
            "border-bottom-style": {
                pattern: "^\\s*(?:none|hidden|solid|double|groove|ridge|inset|outset|dotted|dashed)\\s*$"
            },
            "border-right-style": {
                pattern: "^\\s*(?:none|hidden|solid|double|groove|ridge|inset|outset|dotted|dashed)\\s*$"
            }
        }
    };
    for (var t in RickDOM.prototype.allowings)
        for (var n in e)
            void 0 === RickDOM.prototype.allowings[t][n] && (RickDOM.prototype.allowings[t][n] = e[n])
}(),
function() {
    $(function() {
        return $("#user_profile_birthday").datepicker({
            startView: "decade",
            format: "yyyy/mm/dd",
            endDate: Date()
        })
    })
}
.call(this);
