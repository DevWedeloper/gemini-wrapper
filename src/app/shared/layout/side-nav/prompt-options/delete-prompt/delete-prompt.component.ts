import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnDialogRef,
  injectBrnDialogContext,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { GeminiService } from 'src/app/shared/gemini.service';

@Component({
  selector: 'app-delete-prompt',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
  ],
  host: {
    class: 'w-[425px]',
  },
  template: `
    <hlm-dialog-header>
      <h3 hlmDialogTitle>Delete chat?</h3>
      <p hlmDialogDescription>
        This will delete
        <strong class="font-bold">{{ title }}</strong>
        .
      </p>
    </hlm-dialog-header>
    <hlm-dialog-footer>
      <button
        hlmBtn
        variant="destructive"
        class="mt-2"
        (click)="deletePrompt()"
      >
        Delete
      </button>
    </hlm-dialog-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePromptComponent {
  private _dialogRef = inject(BrnDialogRef);
  private _dialogContext = injectBrnDialogContext<{
    id: number;
    title: string;
  }>();
  protected id = this._dialogContext.id;
  protected title = this._dialogContext.title;

  private geminiService = inject(GeminiService);

  protected deletePrompt(): void {
    this.geminiService.deletePrompt(this.id);
    this._dialogRef.close();
  }
}
