(function() {
	let app = {
		LOCAL_STORAGE_KEY: 'notebook',
		
		init() {
			this.notes = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)) || [];
			this.selectedIndex = null;
			
			this.$el = document.querySelector('#app');
			
			this.$el.addEventListener('click', this, false);
			
			this.$main = this.$el.querySelector('.main-view');
			this.$note = this.$el.querySelector('.note-view');
			this.$notes = this.$el.querySelector('.notes');
			this.$trash = this.$note.querySelector('.nav-btn-trash');
			this.$editor = this.$note.querySelector('.editor');
			
			this.render();
		},
		
		handleEvent(event) {
			let target = event.target;
			switch (true) {
				case target.matches('.fa.fa-gear'):
				this.settings();
				break;
				case target.matches('.fa.fa-bars'):
				this.home();
				break;
				case target.matches('.add-note') || target.parentElement.matches('.add-note'):
				this.add();
				break;
				case target.matches('.note'):
				this.view(event);
				break;
				case target.matches('.nav-btn-back'):
				this.back();
				break;
				case target.matches('.nav-btn-trash'):
				this.trash();
				break;
			}
		},
		
		settings() {
			this.$main.classList.remove('home');
			this.$main.classList.add('flip');
		},
		
		home() {
			this.$main.classList.remove('flip');
			this.$main.classList.add('home');
		},
		
		add() {
			this.$note.classList.add('push');
			this.$trash.style.visibility = 'hidden';
		},
		
		pop() {
			this.$note.classList.remove('push');
		},
		
		view(event) {
			this.selectedIndex = event.target.dataset.index;
			this.$editor.value = this.notes[this.selectedIndex].text;
			this.$trash.style.visibility = 'visible';
			this.$note.classList.add('push');
		},
		
		back() {
			// 当前正在新建便签
			if (this.selectedIndex === null && this.$editor.value.length > 0) {
				this.notes.push({ text: this.$editor.value })
			}
			
			// 当前正在查看便签
			if (this.selectedIndex != null) {
				this.notes[this.selectedIndex].text = this.$editor.value;
			}
			
			this.save();
			this.clear();
			this.render();
+			this.pop();
		},
		
		save() {
			localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.notes));
		},
		
		clear() {
			this.$editor.value = '';
		},
		
		trash() {
			if (this.selectedIndex === null) return;
			if (!confirm('确定要删除这个便签吗？')) return;
			this.$editor.value = '';
			this.notes.splice(this.selectedIndex, 1);
			this.save();
			this.render();
			this.pop();
		},
		
		 render() {
			 this.$notes.innerHTML = this.notes
				.map(function(note, i) {
					return `<div class='note' data-index='${i}'>${note.text}</div>`
				})
				.join('');
		 }
 	};
	
	document.addEventListener('DOMContentLoaded', function() {
		app.init()
	});
	
	window.app = app;
})();